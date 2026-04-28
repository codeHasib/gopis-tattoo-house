import "../../globals.css";

export const metadata = {
  title: "Gopis Tattoo House - Admin Login Page",
  description: "Admin page for managing the data",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <section className="antialiased">
        {children}
        </section>
    </>
  );
}
