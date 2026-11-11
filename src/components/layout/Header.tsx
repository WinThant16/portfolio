"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/projects", label: "Projects" },
	{ href: "/experience", label: "Experience" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

	return (
		<header
			className={cn(
				"sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300",
				isScrolled ? "border-line" : "border-transparent",
			)}
		>
			<div className="wrap flex h-16 items-center justify-between gap-6">
				<Link href="/" className="group flex min-w-0 items-center gap-3">
					<span className="relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
						<Image
							src="/avatar.JPEG"
							alt=""
							fill
							className="object-cover"
							sizes="36px"
							priority
						/>
					</span>
					<span className="min-w-0 leading-tight">
						<span className="font-display block truncate text-[1.0625rem] text-ink transition-colors group-hover:text-navy">
							Win Thant Tin Han
						</span>
						<span className="block truncate text-[0.8125rem] text-dim">MSCS @ USC</span>
					</span>
				</Link>

				<nav aria-label="Main" className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => {
						const active = isActive(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"relative rounded-md px-3 py-2 text-[0.9375rem] transition-colors",
									active ? "text-ink" : "text-dim hover:text-ink",
								)}
							>
								{item.label}
								{active && (
									<span
										aria-hidden
										className="absolute inset-x-3 -bottom-[13px] h-px bg-navy"
									/>
								)}
							</Link>
						);
					})}
					<Link href="/resume" className="btn btn-line btn-sm ml-3">
						Resume
					</Link>
				</nav>

				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger
						className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-ink hover:bg-panel md:hidden"
						aria-label="Open menu"
					>
						<Menu className="size-5" />
					</SheetTrigger>
					<SheetContent side="right" className="w-full max-w-xs border-l border-line bg-paper p-0">
						<SheetTitle className="sr-only">Navigation</SheetTitle>
						<nav aria-label="Mobile" className="flex flex-col px-6 pt-16">
							{[
								{ href: "/", label: "Home" },
								...navItems,
								{ href: "/resume", label: "Resume" },
							].map((item) => {
								const active = isActive(item.href);
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setIsOpen(false)}
										aria-current={active ? "page" : undefined}
										className={cn(
											"font-display border-b border-line py-4 text-2xl transition-colors",
											active ? "text-navy" : "text-ink hover:text-navy",
										)}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
