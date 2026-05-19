import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PrivacyContent } from "@/components/sections/privacy/PrivacyContent";
import { PrivacyHero } from "@/components/sections/privacy/PrivacyHero";
import ReduxStoreProvider from "@/redux/provider/ReduxStoreProvider";

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
    <ReduxStoreProvider>
      <main>
        <Navbar />
        <PrivacyHero />
        <PrivacyContent />
        <NewsletterSection />
        <Footer />
      </main>
    </ReduxStoreProvider>
  );
}
