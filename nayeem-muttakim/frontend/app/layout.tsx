import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "FileHarbor",
  description: "Host your files. Ahoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full bg-[#0F1117] flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
