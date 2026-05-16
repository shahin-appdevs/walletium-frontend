import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PartnerSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <SecuritySection />
      <TestimonialsSection />
      <AppDownloadSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
