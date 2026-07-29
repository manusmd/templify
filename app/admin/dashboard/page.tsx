import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

const modules = [
  {
    title: "Social",
    body: "Compose and schedule Instagram posts through Buffer, with template-aware drafts.",
    status: "Coming in Phase 2",
  },
  {
    title: "Templates",
    body: "Manage the template index and collections.",
    status: "Planned",
  },
  {
    title: "Analytics",
    body: "Countly insights alongside social engagement.",
    status: "Planned",
  },
];

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <span className={styles.navbrand}>Templify Admin</span>
        <div className={styles.who}>
          <span className={styles.muted} style={{ fontSize: 13 }}>
            {session.user.email}
          </span>
          <LogoutButton />
        </div>
      </div>
      <div className={styles.main}>
        <h1 className={styles.h1}>Dashboard</h1>
        <p className={styles.muted}>
          Signed in as {session.user.email}. This is the admin shell — feature
          modules land here next.
        </p>
        <div className={styles.cards}>
          {modules.map((m) => (
            <div className={styles.modcard} key={m.title}>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
              <span className={styles.soon}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
