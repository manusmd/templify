import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminTopbar from "../AdminTopbar";
import TwoFactorPanel from "./TwoFactorPanel";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorEnabled: true },
  });

  return (
    <div className={styles.wrap}>
      <AdminTopbar
        email={session.user.email}
        back={{ href: "/admin/dashboard", label: "Dashboard" }}
      />
      <div className={styles.main}>
        <h1 className={styles.h1}>Security</h1>
        <p className={styles.muted}>Protect the admin with a second factor.</p>
        <div style={{ marginTop: 24 }}>
          <TwoFactorPanel enabled={Boolean(user?.twoFactorEnabled)} />
        </div>
      </div>
    </div>
  );
}
