/**
 * Privacy Policy content.
 *
 * Pure data — no React imports. Safe to edit the strings, headings, and
 * section order without touching the component file. Icons are referenced
 * by string key; the mapping lives in PrivacyContent.jsx.
 *
 * To add / reorder / rename sections, update PRIVACY_SECTIONS below.
 * To swap an icon, change the `icon` field to one of:
 *   "database" | "settings-2" | "share-2" | "shield-check"
 *   | "user-check" | "refresh-cw"
 * (or add a new key in the ICON_MAP inside PrivacyContent.jsx).
 */

export const PRIVACY_LAST_UPDATED = "October 2026";

export const PRIVACY_INTRO =
  "At Walletium, we are committed to protecting the privacy and security of our users’ personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide to us when using our services.";

export const PRIVACY_SECTIONS = [
  {
    id: "information-we-collect",
    number: 1,
    title: "Information We Collect",
    icon: "database",
    blocks: [
      {
        heading: "Personal Information",
        body: "We may collect personal information such as your name, email address, phone number, and billing information when you sign up for an account or use our services.",
      },
      {
        heading: "Usage Information",
        body: "We may collect information about how you interact with our platform, including your transaction history, device information, and IP address.",
      },
    ],
  },
  {
    id: "how-we-use",
    number: 2,
    title: "How We Use Your Information",
    icon: "settings-2",
    blocks: [
      {
        heading: "To Provide Services",
        body: "We use your information to provide and improve our services, process transactions, and respond to your inquiries.",
      },
      {
        heading: "To Personalize User Experience",
        body: "We may use your information to personalize your experience, including offering tailored promotions and recommendations.",
      },
      {
        heading: "To Ensure Security",
        body: "We use your information to ensure the security of our platform, including detecting and preventing fraudulent activities.",
      },
    ],
  },
  {
    id: "sharing-and-disclosure",
    number: 3,
    title: "Information Sharing and Disclosure",
    icon: "share-2",
    blocks: [
      {
        heading: "Third-Party Service Providers",
        body: "We may share your information with third-party service providers who assist us in providing our services, such as payment processors and customer support providers.",
      },
      {
        heading: "Legal Compliance",
        body: "We may disclose your information to comply with legal obligations, enforce our policies, or protect the rights, property, or safety of Walletium or others.",
      },
    ],
  },
  {
    id: "data-security",
    number: 4,
    title: "Data Security",
    icon: "shield-check",
    blocks: [
      {
        body: "We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.",
      },
      {
        body: "Despite our efforts, no security measures are entirely foolproof, and we cannot guarantee the absolute security of your information.",
      },
    ],
  },
  {
    id: "your-choices-and-rights",
    number: 5,
    title: "Your Choices and Rights",
    icon: "user-check",
    blocks: [
      {
        body: "You have the right to access, correct, or delete your personal information. You may also choose to opt-out of certain communications or services.",
      },
      {
        body: "Please contact us if you have any questions or concerns about your privacy rights or how your information is being handled.",
      },
    ],
  },
  {
    id: "updates",
    number: 6,
    title: "Updates to This Privacy Policy",
    icon: "refresh-cw",
    blocks: [
      {
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
      },
      {
        body: "We will notify you of any material changes to this Policy by posting the updated version on our website or through other appropriate channels.",
      },
    ],
  },
];

export const PRIVACY_CLOSING =
  "By using Walletium, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. If you have any questions or concerns about our Privacy Policy or practices, please contact us.";
