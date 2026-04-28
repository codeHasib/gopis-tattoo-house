import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ReviewClient from "@/components/admin/ReviewClient";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <ReviewClient></ReviewClient>;
}
