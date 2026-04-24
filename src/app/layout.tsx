import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DashboardLayout from "@/components/DashboardLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeriTest.LAB Dashboard",
  description: "Dashboard de seguimiento del proyecto VeriTest.LAB - Laboratorio Microbiología BSL-2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}