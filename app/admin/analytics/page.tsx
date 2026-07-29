import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { PostMetric } from "@/lib/buffer";
import { refreshMetrics } from "../social/actions";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";
import s from "../social/social.module.css";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const posts = await prisma.socialPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  const withMetrics = posts.filter(
    (p) => Array.isArray(p.metrics) && (p.metrics as PostMetric[]).length > 0,
  );

  // Aggregate totals across count metrics (skip percentages — they don't sum).
  const totals = new Map<string, { name: string; value: number }>();
  for (const p of withMetrics) {
    for (const m of p.metrics as PostMetric[]) {
      if (m.unit === "percentage") continue;
      const cur = totals.get(m.type);
      totals.set(m.type, {
        name: m.name,
        value: (cur?.value ?? 0) + m.value,
      });
    }
  }

  return (
    <AdminShell email={session.user.email} active="/admin/analytics">
      <h1 className={styles.h1}>Analytics</h1>
      <p className={styles.muted}>Instagram engagement per post, from Buffer.</p>

      <div className={s.postsHead} style={{ marginTop: 24 }}>
        <span className={s.hint}>{withMetrics.length} posts with metrics</span>
        <form action={refreshMetrics}>
          <button type="submit" className={s.refresh}>
            Refresh metrics
          </button>
        </form>
      </div>

      {totals.size > 0 && (
        <div className={s.statRow}>
          {[...totals].map(([type, t]) => (
            <div className={s.stat} key={type}>
              <div className={s.statValue}>{t.value.toLocaleString()}</div>
              <div className={s.statLabel}>Total {t.name}</div>
            </div>
          ))}
        </div>
      )}

      {withMetrics.length === 0 ? (
        <p className={s.empty}>
          No metrics yet. Instagram data appears after a post goes live — publish
          one, then hit Refresh metrics.
        </p>
      ) : (
        <div className={s.posts}>
          {withMetrics.map((p) => {
            const metrics = p.metrics as PostMetric[];
            return (
              <div className={s.post} key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.postImg} src={p.imageUrl} alt="" />
                <div className={s.postBody}>
                  <div className={s.postCaption}>{p.caption}</div>
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
                  {p.metricsUpdatedAt && (
                    <div className={s.postMeta}>
                      <span>
                        updated{" "}
                        {p.metricsUpdatedAt
                          .toISOString()
                          .slice(0, 16)
                          .replace("T", " ")}{" "}
                        UTC
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
