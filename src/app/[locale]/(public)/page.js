import { Navbar } from "@/components/layout/Navbar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnerSection } from "@/components/sections/PartnerSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PartnerSection />
      <FeaturesSection />
    </main>
  );
}
