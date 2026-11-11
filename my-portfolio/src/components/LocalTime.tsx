"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
	timeZone: "America/Los_Angeles",
	hour: "numeric",
	minute: "2-digit",
});

/** Current time in Los Angeles. Rendered client-side only to avoid a hydration mismatch. */
export function LocalTime() {
	const [now, setNow] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setNow(fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	}, []);

	return (
		<span className="tabular-nums" aria-live="off">
			{now ? `${now} local time` : " "}
		</span>
	);
}
