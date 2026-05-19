import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { LegalHero } from "@/components/sections/legal/LegalHero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import {
  REFUND_CLOSING,
  REFUND_INTRO,
  REFUND_LAST_UPDATED,
  REFUND_SECTIONS,
} from "@/data/refund";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata = {
  title: "Refund Policy — Walletium · Transparent Practices",
  description:
    "Read Walletium's Refund Policy. Learn how we handle payments, data, and refunds — clearly and transparently.",
};

export default function RefundPage() {
  return (
    <main>
      <Navbar />
      <LegalHero
        breadcrumb="Refund Policy"
        titleLead="Refund"
        titleAccent="Policy"
        lead="Transparent policies designed to protect and inform our users. Learn how Walletium handles refunds, privacy, and data protection."
        lastUpdated={REFUND_LAST_UPDATED}
      />
      <LegalContent
        intro={REFUND_INTRO}
        sections={REFUND_SECTIONS}
        closing={REFUND_CLOSING}
        contactCta={{
          heading: "Questions about a refund?",
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
