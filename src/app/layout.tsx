import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Novelin",
  description: "Web baca novel dan comic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={lato.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
