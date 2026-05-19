import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { LegalHero } from "@/components/sections/legal/LegalHero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import {
  PRIVACY_CLOSING,
  PRIVACY_INTRO,
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
} from "@/data/privacy";

// Static — privacy policy rarely changes; revalidate once a day so an edit
// shows up within the same business day without rebuilding.
export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata = {
  title: "Privacy Policy — Walletium · Your Data, Protected",
  description:
    "Learn how Walletium collects, uses, and protects your personal information. Transparent privacy practices for a fintech you can trust.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <LegalHero
        breadcrumb="Privacy Policy"
        titleLead="Privacy"
        titleAccent="Policy"
        lead="Your privacy and data security matter to us. Learn how Walletium collects, uses, and protects your information."
        lastUpdated={PRIVACY_LAST_UPDATED}
      />
      <LegalContent
        intro={PRIVACY_INTRO}
        sections={PRIVACY_SECTIONS}
        closing={PRIVACY_CLOSING}
        contactCta={{
          heading: "Questions about your privacy?",
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
