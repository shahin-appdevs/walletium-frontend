import { Alert, Card } from "antd";
import { AlertCircle } from "lucide-react";
import React, { memo } from "react";
import { useTranslations } from "next-intl";

function AddMoneySummery({
  amount,
  selectedCurrencyCode,
  totalFee,
  totalPayable,
  selectedGateway,
  conversionAmount,
}) {
  const t = useTranslations("Dashboard.addMoney.summary");

  return (
    <Card title={t("title")} className="h-full">
      <div className="bg-neutral-50 dark:bg-slate-950 rounded-2xl px-6 py-4">
        <div className="text-base space-y-4 ">
          <div className="flex justify-between ">
            <span className="text-gray-700 dark:text-gray-400">
              {t("enteredAmount")}
            </span>
            <span className="font-semibold">
              {(amount ?? 0).toFixed(2)} {selectedCurrencyCode}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-gray-700 dark:text-gray-400">
              {t("conversionAmount")}
            </span>
            <span className="font-semibold">
              {(conversionAmount ?? 0).toFixed(2)}{" "}
              {selectedGateway?.currency_code}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-gray-700 dark:text-gray-400">
              {t("totalFees")}
            </span>
            <span className="font-semibold">
              {(totalFee ?? 0).toFixed(2)} {selectedGateway?.currency_code}
            </span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg border-t border-neutral-200 dark:border-gray-700">
            <span>{t("totalPayable")}</span>
            <span className="text-lg font-semibold">
              {(totalPayable ?? 0)?.toFixed(2)} {selectedGateway?.currency_code}
            </span>
          </div>
        </div>

        {selectedGateway?.type === "MANUAL" && (
          <Alert
            message={t("manualPayment")}
            description={t("manualDescription")}
            type="warning"
            showIcon
            icon={<AlertCircle className="w-4 h-4" />}
            className="mt-6"
          />
        )}
      </div>
    </Card>
  );
}

export default memo(AddMoneySummery);
