import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import Header from "@/components/layout/Header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://win-thant-portfolio.vercel.app"),

  title: {
    default: "Win Thant Tin Han | Software Engineer",
    template: "%s | Win Thant Tin Han",
  },

  description:
    "Software engineer and M.S. Computer Science student at USC building production web applications, full-stack systems, algorithms, and applied AI/ML projects.",

  openGraph: {
    title: "Win Thant Tin Han | Software Engineer",
    description:
      "Production software, full-stack systems, algorithms, and applied AI/ML projects.",
    type: "website",
    url: "/",
    siteName: "Win Thant Tin Han",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen relative antialiased
                    bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
