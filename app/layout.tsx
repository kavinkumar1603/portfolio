import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavin Kumar — Full Stack Developer",
  description:
    "Portfolio of Kavin Kumar, a Full Stack Developer specializing in React, Next.js, and modern web technologies. Building beautiful digital experiences.",
  keywords: ["Kavin Kumar", "Full Stack Developer", "React", "Next.js", "Portfolio", "Web Developer"],
  authors: [{ name: "Kavin Kumar" }],
  openGraph: {
    title: "Kavin Kumar — Full Stack Developer",
    description: "Crafting beautiful digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
