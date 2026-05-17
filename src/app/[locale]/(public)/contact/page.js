import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const metadata = {
  title: "Contact Walletium — We're Here to Help",
  description:
    "Get in touch with the Walletium team. Find our office, phone, email, and send us a message — we typically respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
