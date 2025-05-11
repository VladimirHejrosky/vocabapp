import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import { NavBar } from "./components/NavBar";
import "./globals.css";
import { PWARegister } from "./components/pwa-register";

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
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header className="mb-20">
              <NavBar />
            </header>
            <main>{children}</main>
          </ThemeProvider>
          <PWARegister />
        </body>
      </html>
    </ClerkProvider>
  );
}
