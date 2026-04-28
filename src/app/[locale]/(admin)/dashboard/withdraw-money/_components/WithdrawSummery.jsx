import { Card } from "antd";
import React, { memo } from "react";
import { useTranslations } from "next-intl";

function WithdrawSummery({
  amount,
  selectedCurrencyCode,
  totalFee,
  youWillGet,
  totalPayable,
  manualSubmitInfo,
  selectedGateway,
  conversionAmount,
}) {
  const t = useTranslations("Dashboard.withdrawMoney.summary");

  return (
    <Card title={t("title")} className="h-full">
      {manualSubmitInfo ? (
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 dark-border shadow-xs border border-gray-200 dark:border-gray-800 mb-6">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {[
              {
                label: "Gateway",
                value: manualSubmitInfo.gateway_currency_name,
              },
              {
                label: "Request Amount",
                value: manualSubmitInfo.request_amount,
              },
              {
                label: "Exchange Rate",
                value: manualSubmitInfo.exchange_rate,
              },
              {
                label: "Conversion Amount",
                value: manualSubmitInfo.conversion_amount,
              },
              {
                label: "Total Charge",
                value: manualSubmitInfo.total_charge,
              },
              {
                label: "Will Get",
                value: manualSubmitInfo.will_get,
              },
              {
                label: "Total Payable",
                value: manualSubmitInfo.payable,
                bold: true,
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 text-sm"
              >
                <span
                  className={`text-gray-600 font-medium dark:text-gray-400 ${
                    row.bold ? "font-bold text-base lg:text-lg" : ""
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`text-gray-900 dark:text-gray-100 ${
                    row.bold
                      ? "font-bold text-base lg:text-lg text-primary!"
                      : "font-medium"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t("gatewayName")}
              </span>
              <span>
                {selectedGateway?.name} ({selectedGateway?.currency_code})
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t("enteredAmount")}
              </span>
              <span>
                {amount || 0} {selectedCurrencyCode}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t("conversionAmount")}
              </span>
              <span>
                {conversionAmount || 0} {selectedGateway?.currency_code}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t("totalFees")}
              </span>
              <span className="text-red-600">
                {totalFee} {selectedGateway?.currency_code}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t("youWillGet")}
              </span>
              <span>
                {youWillGet?.toFixed(2)} {selectedGateway?.currency_code}
              </span>
            </div>

            <div className="flex justify-between py-4 font-semibold text-base border-t">
              <span>{t("totalPayable")}</span>
              <span>
                {totalPayable} {selectedCurrencyCode}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default memo(WithdrawSummery);
