import { Suspense } from "react";
import TwoFactorAuthClient from "./_components/TwoFactorAuthClient";
import TwoFactorSkeleton from "./_components/TwoFactorSkeleton";

import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.security.2fa",
  });

  return {
    title: t("title"),
  };
}

export default async function TwoFactorPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<TwoFactorSkeleton />}>
      <TwoFactorAuthClient />
    </Suspense>
  );
}
