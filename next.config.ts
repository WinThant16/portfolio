import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// /resume opens the PDF. Not permanent, so the target can change when the file does.
	async redirects() {
		return [{ source: "/resume", destination: "/Win-Thant-Tin-Han-Resume.pdf", permanent: false }];
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "img.youtube.com" },
			{ protocol: "https", hostname: "i.ytimg.com" },
		],
	},
};

export default nextConfig;
