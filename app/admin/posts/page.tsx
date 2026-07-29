import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBufferConfig } from "@/lib/settings";
import { refreshMetrics, publishPost, deleteSocialPost } from "../social/actions";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";
import s from "../social/social.module.css";

export const dynamic = "force-dynamic";

function badgeClass(status: string) {
  return status === "sent"
    ? s.badgeSent
    : status === "failed"
      ? s.badgeFailed
      : s.badgeScheduled;
}

export default async function PostsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const cfg = await getBufferConfig();
  const posts = await prisma.socialPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell email={session.user.email} active="/admin/posts">
      <h1 className={styles.h1}>Posts</h1>
      <p className={styles.muted}>
        Everything scheduled or published through the admin. Status is synced
        from Buffer.
      </p>

      <div className={s.postsHead} style={{ marginTop: 24 }}>
        <span className={s.hint}>{posts.length} posts</span>
        {cfg.connected && (
          <form action={refreshMetrics}>
            <button type="submit" className={s.refresh}>
              Sync from Buffer
            </button>
          </form>
        )}
      </div>

      {posts.length === 0 ? (
        <p className={s.empty}>Nothing yet — schedule something from Social.</p>
      ) : (
        <div className={s.posts}>
          {posts.map((p) => {
            const slides = Array.isArray(p.imageUrls) ? p.imageUrls.length : 1;
            return (
              <div className={s.post} key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.postImg} src={p.imageUrl} alt="" />
                <div className={s.postBody}>
                  <div className={s.postCaption}>{p.caption}</div>
                  <div className={s.postMeta}>
                    <span className={`${s.badge} ${badgeClass(p.status)}`}>
                      {p.status}
                    </span>
                    <span>{p.type}</span>
                    {slides > 1 && <span>· {slides} slides</span>}
                    {p.scheduledAt && (
                      <span>
                        {p.scheduledAt.toISOString().slice(0, 16).replace("T", " ")}{" "}
                        UTC
                      </span>
                    )}
                    {p.error && <span title={p.error}>· {p.error.slice(0, 50)}</span>}
                  </div>
                  <div className={s.postActions}>
                    {p.status !== "sent" && p.bufferPostId && (
                      <form action={publishPost.bind(null, p.id)}>
                        <button type="submit" className={s.pubBtn}>
                          Publish now
                        </button>
                      </form>
                    )}
                    <form action={deleteSocialPost.bind(null, p.id)}>
                      <button type="submit" className={s.delBtn}>
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
