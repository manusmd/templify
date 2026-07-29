"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "../admin.module.css";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className={styles.logout}
      onClick={async () => {
        await authClient.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
