import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBufferConfig, getSetting, SETTING } from "@/lib/settings";
import { getChannels, type BufferChannel } from "@/lib/buffer";
import { templates } from "@/lib/templates";
import { TEMPLATE_SHOTS, slideUrl } from "@/lib/social";
import { disconnectBuffer, generateSlideDescriptions } from "./actions";
import AdminShell from "../AdminShell";
import ConnectForm from "./ConnectForm";
import ChannelPicker from "./ChannelPicker";
import Composer from "./Composer";
import styles from "../admin.module.css";
import s from "./social.module.css";

export const dynamic = "force-dynamic";

export default async function SocialPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const cfg = await getBufferConfig();

  let channels: BufferChannel[] = [];
  let channelsError: string | null = null;
  if (cfg.apiKey && !cfg.channelId && cfg.organizationId) {
    try {
      channels = await getChannels(cfg.apiKey, cfg.organizationId);
    } catch (e) {
      channelsError = e instanceof Error ? e.message : "Could not load channels.";
    }
  }

  const hasAiKey = Boolean(await getSetting(SETTING.anthropicApiKey));

  const publicBase = process.env.BETTER_AUTH_URL ?? "";
  const descRows = cfg.connected ? await prisma.slideDescription.findMany() : [];
  const descMap = new Map(descRows.map((d) => [d.key, d.text]));
  const descTotal = Object.values(TEMPLATE_SHOTS).reduce(
    (n, shots) => n + shots.length,
    0,
  );

  const templateOptions = templates
    .filter((t) => t.demo && TEMPLATE_SHOTS[t.slug])
    .map((t) => {
      const tag = t.tag.replace(/\s*·\s*Live\s*$/i, "");
      return {
        slug: t.slug,
        name: t.name,
        tag,
        demo: t.demo!,
        slides: TEMPLATE_SHOTS[t.slug].map((sfx) => {
          const path = `/templates/${t.slug}-${sfx}.jpg`;
          return slideUrl(publicBase, path, t.name, tag, descMap.get(path) ?? "");
        }),
      };
    });

  return (
    <AdminShell email={session.user.email} active="/admin/social">
      <h1 className={styles.h1}>Social</h1>
      <p className={styles.muted}>
        Compose and schedule Instagram posts through Buffer.
      </p>

      <div style={{ marginTop: 22 }}>
        <span className={s.status}>
          <span className={`${s.dot} ${cfg.connected ? s.dotOn : ""}`} />
          {cfg.connected
            ? `Connected · ${cfg.channelName ?? "Instagram"}`
            : cfg.apiKey
              ? "Buffer connected — choose a channel"
              : "Not connected"}
        </span>
      </div>

      {!cfg.apiKey && <ConnectForm />}

      {cfg.apiKey && !cfg.channelId && (
        <ChannelPicker channels={channels} error={channelsError} />
      )}

      {cfg.connected && (
        <>
          <div className={s.descBar}>
            <span className={s.hint}>
              AI slide descriptions: {descMap.size}/{descTotal}
            </span>
            {hasAiKey ? (
              <form action={generateSlideDescriptions}>
                <button type="submit" className={s.refresh}>
                  {descMap.size < descTotal
                    ? "Generate descriptions"
                    : "Regenerate missing"}
                </button>
              </form>
            ) : (
              <span className={s.hint}>
                Add your Anthropic key below to enable
              </span>
            )}
          </div>

          <Composer
            templates={templateOptions}
            username={cfg.channelName ?? "templify"}
            hasAiKey={hasAiKey}
          />

          <form action={disconnectBuffer} style={{ marginTop: 32 }}>
            <button type="submit" className={s.link}>
              Disconnect Buffer
            </button>
          </form>
        </>
      )}
    </AdminShell>
  );
}
