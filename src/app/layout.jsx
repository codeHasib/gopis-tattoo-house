import "./globals.css";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Gopis Tattoo Studio | Custom Art & Professional Studio in Chittagong",
  description:
    "Top-rated tattoo studio in Chittagong. Specializing in custom designs, fine-line, and realism. Book your free consultation with our expert artists today!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${playfair.variable} h-full antialiased bg-white text-black`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
