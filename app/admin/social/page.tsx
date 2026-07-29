import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBufferConfig } from "@/lib/settings";
import { getChannels, type BufferChannel, type PostMetric } from "@/lib/buffer";
import { templates } from "@/lib/templates";
import { disconnectBuffer, refreshMetrics } from "./actions";
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

  const posts = cfg.connected
    ? await prisma.socialPost.findMany({ orderBy: { createdAt: "desc" }, take: 30 })
    : [];

  const publicBase = process.env.BETTER_AUTH_URL ?? "";
  const templateOptions = templates
    .filter((t) => t.demo && t.image)
    .map((t) => ({
      slug: t.slug,
      name: t.name,
      tag: t.tag.replace(/\s*·\s*Live\s*$/i, ""),
      demo: t.demo!,
      image: `${publicBase}${t.image}`,
    }));

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
          <Composer
            templates={templateOptions}
            username={cfg.channelName ?? "templify"}
          />

          <div style={{ marginTop: 40 }}>
            <div className={s.postsHead}>
              <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: 24 }}>
                Recent posts
              </h2>
              <form action={refreshMetrics}>
                <button type="submit" className={s.refresh}>
                  Refresh metrics
                </button>
              </form>
            </div>
            {posts.length === 0 ? (
              <p className={s.empty}>Nothing scheduled yet.</p>
            ) : (
              <div className={s.posts}>
                {posts.map((p) => {
                  const metrics = (p.metrics as PostMetric[] | null) ?? [];
                  return (
                    <div className={s.post} key={p.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={s.postImg} src={p.imageUrl} alt="" />
                      <div className={s.postBody}>
                        <div className={s.postCaption}>{p.caption}</div>
                        <div className={s.postMeta}>
                          <span
                            className={`${s.badge} ${
                              p.status === "sent"
                                ? s.badgeSent
                                : p.status === "failed"
                                  ? s.badgeFailed
                                  : s.badgeScheduled
                            }`}
                          >
                            {p.status}
                          </span>
                          <span>{p.type}</span>
                          {p.scheduledAt && (
                            <span>
                              {p.scheduledAt.toISOString().slice(0, 16).replace("T", " ")} UTC
                            </span>
                          )}
                          {p.error && <span title={p.error}>· {p.error.slice(0, 60)}</span>}
                        </div>
                        {metrics.length > 0 && (
                          <div className={s.metrics}>
                            {metrics.map((m) => (
                              <span className={s.metric} key={m.type}>
                                <strong>
                                  {m.unit === "percentage"
                                    ? `${m.value}%`
                                    : m.value.toLocaleString()}
                                </strong>{" "}
                                {m.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <form action={disconnectBuffer} style={{ marginTop: 28 }}>
            <button type="submit" className={s.link}>
              Disconnect Buffer
            </button>
          </form>
        </>
      )}
    </AdminShell>
  );
}
