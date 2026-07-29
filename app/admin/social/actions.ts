"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  SETTING,
  setSetting,
  clearSettings,
  getSetting,
  getBufferConfig,
} from "@/lib/settings";
import { getOrganizations, getChannels, createPost, getPost } from "@/lib/buffer";
import { generateCaption as genCaption } from "@/lib/anthropic";

export type ActionResult = { ok: boolean; error?: string };

function normalizeStatus(s: string): string {
  const v = (s ?? "").toLowerCase();
  if (/sent|publish|complete|success/.test(v)) return "sent";
  if (/error|fail/.test(v)) return "failed";
  return "scheduled";
}

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated.");
}

export async function connectBuffer(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireSession();
  const apiKey = String(formData.get("apiKey") ?? "").trim();
  if (!apiKey) return { ok: false, error: "Paste your Buffer API key." };
  try {
    const orgs = await getOrganizations(apiKey);
    if (!orgs.length)
      return { ok: false, error: "No Buffer organization found for this key." };
    const org = orgs[0];
    await setSetting(SETTING.bufferApiKey, apiKey);
    await setSetting(SETTING.bufferOrgId, org.id);
    // Auto-select when there's exactly one Instagram channel.
    const channels = await getChannels(apiKey, org.id);
    const ig = channels.filter((c) => c.service === "instagram");
    if (ig.length === 1) {
      await setSetting(SETTING.bufferChannelId, ig[0].id);
      await setSetting(SETTING.bufferChannelName, ig[0].name);
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Connection failed." };
  }
  revalidatePath("/admin/social");
  return { ok: true };
}

export async function selectChannel(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireSession();
  const id = String(formData.get("channelId") ?? "");
  const name = String(formData.get("channelName") ?? "");
  if (!id) return { ok: false, error: "Pick a channel." };
  await setSetting(SETTING.bufferChannelId, id);
  await setSetting(SETTING.bufferChannelName, name);
  revalidatePath("/admin/social");
  return { ok: true };
}

export async function saveAiKey(key: string): Promise<ActionResult> {
  await requireSession();
  const trimmed = key.trim();
  if (!trimmed) return { ok: false, error: "Paste your Anthropic API key." };
  await setSetting(SETTING.anthropicApiKey, trimmed);
  revalidatePath("/admin/social");
  return { ok: true };
}

export async function generateCaption(args: {
  name: string;
  tag: string;
  demo: string;
  hint?: string;
}): Promise<{ ok: boolean; caption?: string; error?: string }> {
  await requireSession();
  const key = await getSetting(SETTING.anthropicApiKey);
  if (!key) return { ok: false, error: "Add your Anthropic API key first." };
  try {
    const caption = await genCaption(key, args);
    return { ok: true, caption };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Generation failed." };
  }
}

export async function disconnectBuffer(): Promise<void> {
  await requireSession();
  await clearSettings([
    SETTING.bufferApiKey,
    SETTING.bufferOrgId,
    SETTING.bufferChannelId,
    SETTING.bufferChannelName,
  ]);
  revalidatePath("/admin/social");
}

export async function refreshMetrics(): Promise<void> {
  await requireSession();
  const cfg = await getBufferConfig();
  if (!cfg.connected || !cfg.apiKey) return;
  const posts = await prisma.socialPost.findMany({
    where: { bufferPostId: { not: null } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  await Promise.allSettled(
    posts.map(async (p) => {
      try {
        const bp = await getPost(cfg.apiKey!, p.bufferPostId!);
        await prisma.socialPost.update({
          where: { id: p.id },
          data: {
            status: normalizeStatus(bp.status),
            ...(bp.metrics.length ? { metrics: bp.metrics } : {}),
            ...(bp.metricsUpdatedAt
              ? { metricsUpdatedAt: new Date(bp.metricsUpdatedAt) }
              : {}),
          },
        });
      } catch {
        // Skip individual post failures — a partial refresh is fine.
      }
    }),
  );
  revalidatePath("/admin/social");
}

export async function createSocialPost(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireSession();
  const caption = String(formData.get("caption") ?? "").trim();
  const imageUrls = formData
    .getAll("imageUrls")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const igType = String(formData.get("type") ?? "post") as
    | "post"
    | "reel"
    | "story";
  const mode = String(formData.get("mode") ?? "addToQueue") as
    | "addToQueue"
    | "customScheduled";
  const dueAtLocal = String(formData.get("dueAt") ?? "");
  const templateSlug = String(formData.get("templateSlug") ?? "") || null;

  if (!caption) return { ok: false, error: "Write a caption." };
  if (imageUrls.length === 0)
    return { ok: false, error: "Add at least one image for Instagram." };
  if (imageUrls.length > 10)
    return { ok: false, error: "Instagram carousels allow up to 10 images." };

  const cfg = await getBufferConfig();
  if (!cfg.connected || !cfg.apiKey || !cfg.channelId)
    return { ok: false, error: "Buffer isn't connected yet." };

  let dueAtIso: string | undefined;
  if (mode === "customScheduled") {
    if (!dueAtLocal)
      return { ok: false, error: "Pick a date & time to schedule." };
    const d = new Date(dueAtLocal);
    if (Number.isNaN(d.getTime()))
      return { ok: false, error: "Invalid schedule time." };
    dueAtIso = d.toISOString();
  }

  try {
    const post = await createPost(cfg.apiKey, {
      channelId: cfg.channelId,
      text: caption,
      imageUrls,
      igType,
      mode,
      dueAt: dueAtIso,
    });
    await prisma.socialPost.create({
      data: {
        caption,
        imageUrl: imageUrls[0],
        imageUrls,
        type: igType,
        mode,
        status: "scheduled",
        scheduledAt: post.dueAt
          ? new Date(post.dueAt)
          : dueAtIso
            ? new Date(dueAtIso)
            : null,
        bufferPostId: post.id,
        templateSlug,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to schedule.";
    await prisma.socialPost.create({
      data: {
        caption,
        imageUrl: imageUrls[0],
        imageUrls,
        type: igType,
        mode,
        status: "failed",
        scheduledAt: dueAtIso ? new Date(dueAtIso) : null,
        templateSlug,
        error: msg,
      },
    });
    return { ok: false, error: msg };
  }
  revalidatePath("/admin/social");
  return { ok: true };
}
