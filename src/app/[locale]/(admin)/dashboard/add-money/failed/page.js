"use client";

import TransactionFailed from "@/components/partials/TransactionFailed";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function PaymentErrorPage() {
  const router = useRouter();
  const t = useTranslations("Dashboard.addMoney.failedPage");
  const handleRetry = () => {
    router.push("/dashboard/add-money");
  };

  return (
    <TransactionFailed
      title={t("title")}
      errorMsg={t("errorMessage")}
      onRetry={handleRetry}
      retryText={t("retryText")}
    />
  );
}
