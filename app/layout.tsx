import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Scene3D from "./components/Scene3D";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face — tight grotesk for big headings (same family Awwwards uses)
const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Editorial accent — italic serif mixed into sans headings (Immersive Garden style)
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Small uppercase labels, counters, metadata (Lusion style)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Preloader />
        <Scene3D />
        <Cursor />
        <Navbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
