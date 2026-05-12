import { Navbar } from "@/components/layout/Navbar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { SecuritySection } from "@/components/sections/SecuritySection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PartnerSection />
      <FeaturesSection />
      <SecuritySection />
    </main>
  );
}
