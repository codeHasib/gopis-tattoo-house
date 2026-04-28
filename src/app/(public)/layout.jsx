import "../globals.css";

export const metadata = {
  title: "Gopis Tattoo House | Custom Art & Professional Studio in Chittagong",
  description:
    "Top-rated tattoo studio in Chittagong. Specializing in custom designs, fine-line, and realism. Book your free consultation with our expert artists today!",
};

export default function RootLayout({ children }) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
