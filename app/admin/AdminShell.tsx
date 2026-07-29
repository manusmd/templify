import Link from "next/link";
import LogoutButton from "./dashboard/LogoutButton";
import styles from "./admin.module.css";

function Icon({ name }: { name: "dashboard" | "social" | "security" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "dashboard")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  if (name === "social")
    return (
      <svg {...common}>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" as const },
  { href: "/admin/social", label: "Social", icon: "social" as const },
  { href: "/admin/security", label: "Security", icon: "security" as const },
];

export default function AdminShell({
  email,
  active,
  children,
}: {
  email: string;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div>
          <Link href="/admin/dashboard" className={styles.sbBrand}>
            Templify
          </Link>
          <span className={styles.sbEyebrow}>Admin</span>
          <nav className={styles.nav}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`${styles.navItem} ${
                  active === n.href ? styles.navActive : ""
                }`}
              >
                <Icon name={n.icon} />
                <span>{n.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.sbFoot}>
          <span className={styles.sbEmail}>{email}</span>
          <LogoutButton />
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
