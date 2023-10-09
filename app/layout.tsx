import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kino",
  description: "Kino is a small site to follow cinema releases in France",
} satisfies Metadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
