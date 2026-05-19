/**
 * Refund Policy content.
 *
 * Pure data — no React imports. Edit the strings, headings, and section
 * order without touching component code. Icons are referenced by string
 * key; the mapping lives in src/components/sections/legal/LegalContent.jsx.
 *
 * Available icon keys (extend ICON_MAP in LegalContent.jsx if you need more):
 *   "baby" | "clock" | "database" | "file-text" | "lock" | "refresh-cw"
 *   | "settings-2" | "share-2" | "shield-alert" | "shield-check"
 *   | "user-check" | "users"
 */

export const REFUND_LAST_UPDATED = "October 2026";

export const REFUND_INTRO =
  "This Refund Policy explains how Walletium handles information, payments, and refunds. We aim to be transparent about our practices so you can use our services with full confidence.";

export const REFUND_SECTIONS = [
  {
    id: "what-we-collect",
    number: 1,
    title: "What Information Do We Collect?",
    icon: "database",
    blocks: [
      {
        body: "We gather data from you when you register on our site, submit a request, buy any services, react to an overview, or complete a form.",
      },
      {
        body: "When requesting assistance or registering on our site, you may be asked to enter your name, email address, or phone number. However, you may also visit our website anonymously.",
      },
    ],
  },
  {
    id: "how-we-protect",
    number: 2,
    title: "How Do We Protect Your Information?",
    icon: "shield-check",
    blocks: [
      {
        body: "All provided sensitive or credit-related information is securely processed through Stripe.",
      },
      {
        body: "After a transaction is completed, your private data such as credit card details, financial information, or personal identifiers will not be stored on our servers.",
      },
    ],
  },
  {
    id: "third-party-disclosure",
    number: 3,
    title: "Do We Disclose Any Information to Outside Parties?",
    icon: "share-2",
    blocks: [
      {
        body: "We do not sell, trade, or transfer personally identifiable information to outside parties.",
      },
      {
        body: "This does not include trusted third-party providers who assist us in operating our website, conducting business, or servicing users, provided they agree to keep this information confidential.",
      },
      {
        body: "We may also release information when necessary to comply with legal obligations, enforce site policies, or protect rights, safety, and property.",
      },
    ],
  },
  {
    id: "coppa-compliance",
    number: 4,
    title: "Children’s Online Privacy Protection Act Compliance",
    icon: "baby",
    blocks: [
      {
        body: "We comply with the requirements of COPPA (Children’s Online Privacy Protection Act) and do not knowingly collect information from anyone under 13 years of age.",
      },
      {
        body: "Our services and website are intended for individuals who are at least 13 years old or older.",
      },
    ],
  },
  {
    id: "policy-changes",
    number: 5,
    title: "Changes to Our Privacy Policy",
    icon: "refresh-cw",
    blocks: [
      {
        body: "If we decide to update or modify our policies, those changes will be posted on this page.",
      },
    ],
  },
  {
    id: "retention",
    number: 6,
    title: "How Long We Retain Your Information",
    icon: "clock",
    blocks: [
      {
        body: "When you register on our website, we process and retain your information for as long as your account remains active or as required by applicable laws and regulations.",
      },
    ],
  },
];

export const REFUND_CLOSING =
  "By using Walletium, you acknowledge and agree to the practices described in this Refund Policy. If you have questions about a refund, billing, or any of the points above, please reach out — we’re happy to help.";
