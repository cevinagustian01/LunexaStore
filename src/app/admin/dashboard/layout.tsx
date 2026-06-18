import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
