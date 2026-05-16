import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { ServicesGlobal } from "@/components/sections/services/ServicesGlobal";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesWhyChoose } from "@/components/sections/services/ServicesWhyChoose";

export const metadata = {
  title: "Services — Walletium · Fintech Toolkit for Modern Money",
  description:
    "Explore Walletium's full suite of fintech services: digital wallet, secure payment processing, multi-currency support, developer API, financial consulting, and custom-tailored solutions.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <ServicesWhyChoose />
      <ServicesGlobal />
      <ServicesCTA />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
