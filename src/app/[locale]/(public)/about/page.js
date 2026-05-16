import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutDeveloper } from "@/components/sections/about/AboutDeveloper";
import { AboutFeatures } from "@/components/sections/about/AboutFeatures";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutSolutions } from "@/components/sections/about/AboutSolutions";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const metadata = {
  title: "About Walletium — Smart Digital Wallet for Modern Finance",
  description:
    "Walletium is the ultimate digital wallet solution offering seamless money management, multi-currency support, and powerful APIs for individuals and businesses.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutMission />
      <AboutFeatures />
      <AboutSolutions />
      <AboutDeveloper />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
