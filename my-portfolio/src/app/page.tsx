// src/app/page.tsx
import { HeroSection } from "@/components/sections/hero";
import { TechStrip } from "@/components/sections/tech-strip";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TechStrip />
    </main>
  );
} 