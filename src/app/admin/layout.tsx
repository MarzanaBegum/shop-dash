import AdminNav from "@/components/admin/AdminNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Dash Admin",
  description: "Admin Dashboard",
};
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-8">
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
