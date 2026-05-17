import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JournalArticles } from "@/components/sections/journal/JournalArticles";
import { JournalHero } from "@/components/sections/journal/JournalHero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const metadata = {
  title: "Journal — Walletium · Insights, Finance Trends & Updates",
  description:
    "Stories, deep-dives, and product news from the Walletium team — covering the future of digital finance, security, and developer tools.",
};

export default function JournalPage() {
  return (
    <main>
      <Navbar />
      <JournalHero />
      <JournalArticles />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
