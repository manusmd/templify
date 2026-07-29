import Link from "next/link";
import LogoutButton from "./dashboard/LogoutButton";
import styles from "./admin.module.css";

export default function AdminTopbar({
  email,
  back,
}: {
  email: string;
  back?: { href: string; label: string };
}) {
  return (
    <div className={styles.topbar}>
      <div className={styles.who}>
        <Link href="/admin/dashboard" className={styles.navbrand}>
          Templify Admin
        </Link>
        {back && (
          <Link href={back.href} className={styles.muted} style={{ fontSize: 13 }}>
            ← {back.label}
          </Link>
        )}
      </div>
      <div className={styles.who}>
        <span className={styles.muted} style={{ fontSize: 13 }}>
          {email}
        </span>
        <LogoutButton />
      </div>
    </div>
  );
}
