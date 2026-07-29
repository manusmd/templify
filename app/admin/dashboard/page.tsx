import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

const modules = [
  {
    title: "Social",
    body: "Compose and schedule Instagram carousels through Buffer, with AI captions.",
    href: "/admin/social",
    status: "Open",
  },
  {
    title: "Posts",
    body: "Your scheduled and published posts — publish now, delete, sync status.",
    href: "/admin/posts",
    status: "Open",
  },
  {
    title: "Analytics",
    body: "Instagram engagement per post, pulled from Buffer.",
    href: "/admin/analytics",
    status: "Open",
  },
  {
    title: "Security",
    body: "Two-factor authentication for the admin.",
    href: "/admin/security",
    status: "Open",
  },
  {
    title: "Templates",
    body: "Manage the template index and collections.",
    status: "Planned",
  },
];

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  return (
    <AdminShell email={session.user.email} active="/admin/dashboard">
      <h1 className={styles.h1}>Dashboard</h1>
      <p className={styles.muted}>
        Signed in as {session.user.email}. Pick a module to get started.
      </p>
      <div className={styles.cards}>
        {modules.map((m) => {
          const inner = (
            <>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
              <span className={styles.soon}>{m.status}</span>
            </>
          );
          return m.href ? (
            <Link
              href={m.href}
              key={m.title}
              className={`${styles.modcard} ${styles.modcardLink}`}
            >
              {inner}
            </Link>
          ) : (
            <div className={styles.modcard} key={m.title}>
              {inner}
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
