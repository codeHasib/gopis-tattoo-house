import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import "../../../globals.css";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Gopis Tattoo House - Admin Page",
  description: "Admin page for managing the data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body>
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </body>
    </html>
  );
}
