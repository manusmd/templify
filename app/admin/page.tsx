import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth, needsSetup } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Entry point: route to setup (no admin yet), dashboard (signed in), or login.
export default async function AdminIndex() {
  if (await needsSetup()) redirect("/admin/setup");
  const session = await auth.api.getSession({ headers: await headers() });
  redirect(session ? "/admin/dashboard" : "/admin/login");
}
