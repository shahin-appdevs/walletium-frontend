import { Inter } from "next/font/google";

import "./styles/globals.css";

import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Walletium | Dashboard Home",
  description:
    "It is a cutting-edge digital mobile wallet solution designed to revolutionize the way you manage your finances. With a comprehensive suite of features, Walletium empowers users to seamlessly add, send, withdraw, and exchange money, all within a secure and intuitive platform.",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // REQUIRED FOR STATIC EXPORT:
  // This tells next-intl which locale to use for this static branch
  setRequestLocale(locale);

  // Fetch messages for this specific locale
  const messages = await getMessages();

  // Define which languages are Right-to-Left
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        {/* Apply the dark class before React paints, preventing FOUC for
            dark-mode users. Runs synchronously before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased max-w-[1920px] mx-auto w-full shadow`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
