import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../data/profile";

// Self-hosted so builds don't depend on Google Fonts (both are SIL OFL)
const newsreader = localFont({
	src: "../fonts/newsreader.woff2",
	variable: "--font-newsreader",
	weight: "200 800",
	display: "swap",
});

const hanken = localFont({
	src: "../fonts/hanken-grotesk.woff2",
	variable: "--font-hanken",
	weight: "100 900",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("profile.portfolio"),

	title: {
		default: "Win Thant Tin Han | Software Engineer",
		template: "%s | Win Thant Tin Han",
	},

	description:
		"Software engineer and M.S. Computer Science student at USC building production web applications, full-stack systems, algorithms, and applied AI/ML projects.",

	openGraph: {
		title: "Win Thant Tin Han | Software Engineer",
		description: "Production software, full-stack systems, algorithms, and applied AI/ML projects.",
		type: "website",
		url: "/",
		siteName: "Win Thant Tin Han",
	},

	// Large preview card on X/Slack; the image itself comes from app/opengraph-image.png
	twitter: {
		card: "summary_large_image",
	},
};

export const viewport: Viewport = {
	themeColor: "#fffdf9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${newsreader.variable} ${hanken.variable}`}>
			<body className="flex min-h-screen flex-col">
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
			</body>
		</html>
	);
}
