import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "./styles/globals.css";

import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import ReduxStoreProvider from "@/redux/provider/ReduxStoreProvider";
import { TawkTo } from "@/components/integrations/TawkTo";

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

  // Read theme from cookie so we can apply the `dark` class during SSR —
  // avoids FOUC without rendering a <script> through React (which trips a
  // React 19 warning on client-side locale switches).
  const cookieStore = await cookies();
  const isDark = cookieStore.get("theme")?.value === "dark";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={isDark ? "dark" : undefined}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.variable} font-sans antialiased max-w-[1920px] mx-auto w-full shadow`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ReduxStoreProvider>
              {children}
              <TawkTo />
            </ReduxStoreProvider>
          </ThemeProvider>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
