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
import ReduxStoreProvider from "@/redux/provider/ReduxStoreProvider";

// Pre-render and cache at the edge — no server execution per request.
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour cache

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
      {/* <ReduxStoreProvider>
        <NewsletterSection />
      </ReduxStoreProvider> */}
      <Footer />
    </main>
  );
}
