import type { Metadata } from "next";

import { Geist } from "next/font/google";

import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  description: "Jet Morano's personal portfolio website.",
  title: "Jet Street Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} relative bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
