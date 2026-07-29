import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth, needsSetup } from "@/lib/auth";
import LoginForm from "./LoginForm";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await needsSetup()) redirect("/admin/setup");
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/admin/dashboard");

  return (
    <div className={styles.wrap}>
      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.brand}>Templify</div>
          <div className={styles.eyebrow} style={{ marginTop: 18 }}>
            Admin
          </div>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.sub}>Enter your admin credentials to continue.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
