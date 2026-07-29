import { redirect } from "next/navigation";
import { needsSetup } from "@/lib/auth";
import SetupForm from "./SetupForm";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  // Once the single admin exists, setup is closed forever.
  if (!(await needsSetup())) redirect("/admin/login");

  return (
    <div className={styles.wrap}>
      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.brand}>Templify</div>
          <div className={styles.eyebrow} style={{ marginTop: 18 }}>
            First-run setup
          </div>
          <h1 className={styles.title}>Create your admin</h1>
          <p className={styles.sub}>
            This is a single-user panel. The account you create now is the only
            one — there is no public sign-up afterward.
          </p>
          <SetupForm />
        </div>
      </div>
    </div>
  );
}
