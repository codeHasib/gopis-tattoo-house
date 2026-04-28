import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import TattooClient from "@/components/admin/TattooClient";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <TattooClient></TattooClient>;
}
