import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FaqAccordion } from "@/components/sections/faq/FaqAccordion";
import { FaqSupport } from "@/components/sections/faq/FaqSupport";
import { LegalHero } from "@/components/sections/legal/LegalHero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import ReduxStoreProvider from "@/redux/provider/ReduxStoreProvider";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata = {
  title: "FAQ — Walletium · Frequently Asked Questions",
  description:
    "Find answers to common questions about Walletium — security, multi-currency support, developer integration, fees, and more.",
};

export default function FaqPage() {
  return (
    <ReduxStoreProvider>
      <main>
        <Navbar />
        <LegalHero
          breadcrumb="FAQ"
          eyebrow="Help Center"
          titleLead="Frequently Asked"
          titleAccent="Questions"
          lead="Everything you need to know about Walletium — from getting started to building integrations. Search below or browse the answers."
        />
        <FaqAccordion />
        <FaqSupport />
        <NewsletterSection />
        <Footer />
      </main>
    </ReduxStoreProvider>
  );
}
