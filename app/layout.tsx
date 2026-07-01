import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;d?r.classList.add("dark"):r.classList.remove("dark");r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mustafa.software"),
  title: "Muhammad Mustafa — AI Engineer",
  description:
    "AI Engineer building LLM agents, voice assistants, and computer-vision systems, from research prototypes to production-deployed applications.",
  keywords: [
    "AI Engineer",
    "LLM agents",
    "voice agents",
    "computer vision",
    "machine learning",
    "Muhammad Mustafa",
  ],
  authors: [{ name: "Muhammad Mustafa" }],
  openGraph: {
    title: "Muhammad Mustafa — AI Engineer",
    description:
      "AI Engineer building LLM agents, voice assistants, and computer-vision systems.",
    url: "https://www.mustafa.software",
    siteName: "Muhammad Mustafa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mustafa — AI Engineer",
    description:
      "AI Engineer building LLM agents, voice assistants, and computer-vision systems.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#131118" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${archivo.variable} ${jetbrains.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
