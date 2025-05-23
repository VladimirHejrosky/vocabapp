import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import { NavBar } from "./components/NavBar";
import "./globals.css";
import { PWARegister } from "./components/pwa-register";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VocabApp",
  description: "Učení slovíček pomocí kartiček.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="cs" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header>
              <NavBar />
            </header>
            <main className="py-18">{children}</main>
            <CookieBanner />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          <PWARegister />
        </body>
      </html>
    </ClerkProvider>
  );
}
