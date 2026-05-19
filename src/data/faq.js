/**
 * FAQ content.
 *
 * Pure data — no React imports. Edit, reorder, or add Q&As without
 * touching component code. Each item needs a stable `id` (used for
 * accordion state and could later power deep-linking via `#id`).
 *
 * If the list grows past ~15 items, consider adding a `category` field
 * to each item and re-introducing the category filter in FaqAccordion.
 */

export const FAQ_INTRO =
  "Below are the questions we hear most often. Can’t find what you’re looking for? Reach out and we’ll get back to you within one business day.";

export const FAQ_ITEMS = [
  {
    id: "what-is",
    question: "What is Walletium?",
    answer:
      "Walletium is a digital mobile wallet solution that allows users to securely manage their finances, make payments, and conduct transactions directly from their mobile devices.",
  },
  {
    id: "how-it-works",
    question: "How does Walletium work?",
    answer:
      "Walletium provides users with a secure digital wallet to add funds, send money, withdraw balances, exchange currencies, request payments, and utilize vouchers seamlessly.",
  },
  {
    id: "security",
    question: "Is Walletium secure?",
    answer:
      "Yes. Walletium prioritizes user security by using advanced encryption technology, fraud detection systems, and two-factor authentication to protect user data and financial transactions.",
  },
  {
    id: "international",
    question: "Can I use Walletium for international transactions?",
    answer:
      "Yes. Walletium supports multi-currency functionality, allowing users to manage funds and perform international transactions effortlessly.",
  },
  {
    id: "api-integration",
    question: "How do I integrate Walletium with my business applications?",
    answer:
      "Walletium provides a developer-friendly API with comprehensive documentation and flexible endpoints for seamless integration into existing business systems and applications.",
  },
  {
    id: "support",
    question: "What support options are available for Walletium users?",
    answer:
      "Walletium offers dedicated customer support through email and phone channels to help users resolve issues and answer questions quickly.",
  },
  {
    id: "fees",
    question: "Are there any fees associated with using Walletium?",
    answer:
      "Walletium aims to provide transparent and competitive pricing. Certain transaction or service fees may apply depending on usage and services selected.",
  },
  {
    id: "customization",
    question: "Can I customize Walletium to suit my specific business needs?",
    answer:
      "Yes. Walletium offers tailored solutions including custom features, branding options, and integrations designed to meet unique business requirements.",
  },
];
