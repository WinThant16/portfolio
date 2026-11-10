import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Self-hosted so builds don't depend on Google Fonts (both are SIL OFL)
const fraunces = localFont({
  src: "../fonts/fraunces.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

const hanken = localFont({
  src: "../fonts/hanken-grotesk.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

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

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <div id="main" className="flex-1">
            {children}
          </div>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
