import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import Header from "@/components/layout/Header";
import Image from "next/image";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Win Thant Tin Han",
  description: "Projects, research, and contact.",
  openGraph: {
    title: "Win Thant Tin Han",
    description: "Portfolio site. Projects, research, and contact.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen relative antialiased
                    bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        {/* Global background (hidden in light mode, shown in dark mode) */}
        <div className="fixed inset-0 -z-50 hidden dark:block">
          <Image
            src="/starry.jpeg"
            alt=""            // decorative
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Optional soft tint for readability; remove if you prefer pure stars */}
          {/* <div
            className="pointer-events-none absolute inset-0
                       bg-[radial-gradient(ellipse_at_top,rgba(255,0,122,.06),transparent_40%),
                           radial-gradient(ellipse_at_bottom,rgba(88,80,236,.06),transparent_40%)]"
          /> */}
        </div>

        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
