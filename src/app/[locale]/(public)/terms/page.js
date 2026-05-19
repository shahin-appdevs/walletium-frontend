import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { LegalHero } from "@/components/sections/legal/LegalHero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import {
  TERMS_CLOSING,
  TERMS_INTRO,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
} from "@/data/terms";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata = {
  title: "Terms & Conditions — Walletium · Clear, Fair, Transparent",
  description:
    "Review the Terms & Conditions that govern your use of Walletium — transparent policies designed to protect both users and the platform.",
};

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <LegalHero
        breadcrumb="Terms & Conditions"
        titleLead="Terms &"
        titleAccent="Conditions"
        lead="Please review the terms governing the use of Walletium services. Transparent policies designed to protect both users and the platform."
        lastUpdated={TERMS_LAST_UPDATED}
      />
      <LegalContent
        intro={TERMS_INTRO}
        sections={TERMS_SECTIONS}
        closing={TERMS_CLOSING}
        contactCta={{
          heading: "Questions about these terms?",
          body: "Our team is one message away — we typically respond within 24 hours.",
          href: "/contact",
          buttonText: "Contact us",
        }}
      />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
