import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Diego Chavez - ML DSP Engineer",
  description: "Portfolio of Diego Chavez, Machine Learning DSP Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono bg-black_core text-white_clinical overflow-x-clip min-h-screen cursor-none`}>
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
