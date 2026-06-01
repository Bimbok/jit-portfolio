import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jit-portfolio-bimbok.vercel.app"),
  title: {
    default: "Bratik Mukherjee | Full Stack & Android Developer",
    template: "%s | Bratik Mukherjee",
  },
  description:
    "Portfolio of Bratik Mukherjee (Bimbok), a Full Stack and Android Developer building React, Next.js, Kotlin, CLI, compiler-design, and AI-powered projects.",
  keywords: [
    "Bratik Mukherjee",
    "Bimbok",
    "Bratik Mukherjee portfolio",
    "Full Stack Developer",
    "Android Developer",
    "React Developer",
    "Next.js Developer",
    "Kotlin Developer",
    "Compiler Design",
    "Sizuka programming language",
    "AlgoScope",
    "bDoci",
    "bimagic",
    "fyzenor",
  ],
  authors: [{ name: "Bratik Mukherjee", url: "https://jit-portfolio-bimbok.vercel.app" }],
  creator: "Bratik Mukherjee",
  publisher: "Bratik Mukherjee",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/png", sizes: "1024x1024" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon.ico", type: "image/png", sizes: "1024x1024" }],
  },
  openGraph: {
    title: "Bratik Mukherjee | Full Stack & Android Developer",
    description:
      "Explore Bratik Mukherjee's compiler-themed portfolio featuring full-stack web apps, native Android projects, CLI tools, compiler design, and AI workflows.",
    url: "/",
    siteName: "Bratik Mukherjee Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bratik Mukherjee | Full Stack & Android Developer",
    description:
      "Compiler-themed portfolio of Bratik Mukherjee: React, Next.js, Kotlin, Android, CLI tools, compiler design, and AI projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "gFurputTJW0d-GTnJHv-VcLR0X_g7NSB-N2VV71rMno",
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
