import { Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata", // This matches your theme variable
});
export const metadata: Metadata = {
  title: "Job Finder",
  description: "Find your dream job in tech.",
  keywords: ["jobs", "tech jobs", "job search", "career"],
  icons: {
    icon: "/image/appLogo.png"
  },
 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inconsolata.variable}`}>
      <body className="min-h-screen flex flex-col font-inconsolata">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}