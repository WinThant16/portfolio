"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Win</Link>
        <nav className="hidden sm:flex gap-6 text-sm">
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/resume">Resume</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
