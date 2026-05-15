import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "es", "hi", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});
