import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskTale",
  description: "TaskTale: Your Platform for Seamless Task Management and Side Hustles. Find skilled individuals for tasks or earn extra income by offering your services. Whether you need help or want to be your own boss, TaskTale connects people for a world of opportunities. Join now!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
