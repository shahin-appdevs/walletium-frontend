"use client";
import TransactionSuccess from "@/components/partials/TransactionSuccess";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AddMoneySuccessPage() {
  const t = useTranslations("Dashboard.addMoney.successPage");
  const router = useRouter();
  return (
    <TransactionSuccess
      title={t("title")}
      subTitle={t("subTitle")}
      primaryText={t("primaryText")}
      redirectLink="/dashboard/add-money"
      onSecondaryClick={() =>
        router.push("/dashboard/transactions/add-money-log")
      }
      secondaryText={t("secondaryText")}
    />
  );
}
