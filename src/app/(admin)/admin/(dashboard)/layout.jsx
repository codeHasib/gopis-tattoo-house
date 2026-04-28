import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import "../../../globals.css";

export const metadata = {
  title: "Gopis Tattoo House - Admin Page",
  description: "Admin page for managing the data",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <>
      <section className="antialiased">
        <AdminLayoutShell>
          {children}
          </AdminLayoutShell>
      </section>
    </>
  );
}
