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
      <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <div className="flex justify-between py-3">
            <span className="text-gray-600 dark:text-gray-400">
              {t("enteredAmount")}
            </span>
            <span>
              {(amount ?? 0).toFixed(2)} {selectedCurrencyCode}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600 dark:text-gray-400">
              {t("conversionAmount")}
            </span>
            <span>
              {(conversionAmount ?? 0).toFixed(2)}{" "}
              {selectedGateway?.currency_code}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600 dark:text-gray-400">
              {t("totalFees")}
            </span>
            <span className="text-red-600">
              {(totalFee ?? 0).toFixed(2)} {selectedGateway?.currency_code}
            </span>
          </div>
          <div className="flex justify-between py-4 font-semibold text-base border-t">
            <span>{t("totalPayable")}</span>
            <span>
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
