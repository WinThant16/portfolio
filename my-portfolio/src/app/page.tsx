import { HeroSection } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { ExperiencePreview } from "@/components/sections/experience-preview";
import { TechStrip } from "@/components/sections/tech-strip";

export default function Home() {
	return (
		<main>
			<HeroSection />
			<SelectedWork />
			<ExperiencePreview />
			<TechStrip />
		</main>
	);
}
