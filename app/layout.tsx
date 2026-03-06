import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/layout/navbar";
import Footer from "./ui/layout/footer";

import { Geist } from "next/font/google";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NHL Stats",
    default: "NHL Stats",
  },
  description:
    "A modern lightweight app for real-time hockey scores, comprehensive standings, player leaderboards, and playoff brackets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.className}>
      <body className="antialiased bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main
            className="flex flex-col justify-center items-center xl:p-10
    min-h-screen w-full md:pt-16"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
