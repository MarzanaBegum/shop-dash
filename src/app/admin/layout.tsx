import AdminNav from "@/components/admin/AdminNav";
import { Metadata } from "next";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shop Dash Admin",
  description: "Admin Dashboard for Shop Dash",
};
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/login");
  }
  return (
    <div className="pt-8">
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
