import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/layout/navbar";
import Footer from "./ui/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NHL Stats",
    default: "NHL Stats",
  },
  description:
    "A modern lightweight app for real-time hockey scores, comprehensive standings, player leaderboards, and playoff brackets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main
            className="flex flex-col justify-center items-center xl:p-10
    min-h-screen w-full md:pt-15"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
