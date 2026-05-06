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
  const tRoot = useTranslations("Dashboard.withdrawMoney");

  return (
    <Card title={t("title")} className="h-full">
      {manualSubmitInfo ? (
        <div className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-slate-950 shadow-xs  mb-6">
          <div className="space-y-4">
            {[
              {
                label: t("gatewayName"),
                value: manualSubmitInfo.gateway_currency_name,
              },
              {
                label: t("enteredAmount"),
                value: manualSubmitInfo.request_amount,
                dir: "ltr",
              },
              {
                label: tRoot("exchangeRate"),
                value: manualSubmitInfo.exchange_rate,
                dir: "ltr",
              },
              {
                label: t("conversionAmount"),
                value: manualSubmitInfo.conversion_amount,
                dir: "ltr",
              },
              {
                label: t("totalFees"),
                value: manualSubmitInfo.total_charge,
                dir: "ltr",
              },
              {
                label: t("youWillGet"),
                value: manualSubmitInfo.will_get,
                dir: "ltr",
              },
              {
                label: t("totalPayable"),
                value: manualSubmitInfo.payable,
                bold: true,
                dir: "ltr",
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center  text-sm last:border-t border-gray-300 dark:border-gray-800  last:py-3"
              >
                <span
                  className={`text-gray-600  dark:text-gray-400 ${
                    row.bold ? "font-bold text-base lg:text-lg" : ""
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`text-gray-900 dark:text-gray-100 ${
                    row.bold ? "font-bold text-base lg:text-lg " : "font-medium"
                  }`}
                  dir={row.dir}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-neutral-50 dark:bg-slate-950 rounded-2xl p-6">
          <div className="space-y-4">
            <div className="flex justify-between ">
              <span className="text-gray-600 dark:text-gray-400">
                {t("gatewayName")}
              </span>
              <span className="font-medium!">
                {selectedGateway?.name} ({selectedGateway?.currency_code})
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-gray-600 dark:text-gray-400">
                {t("enteredAmount")}
              </span>
              <span dir="ltr" className="font-medium!">
                {Number(amount || 0).toFixed(2)} {selectedCurrencyCode}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-gray-600 dark:text-gray-400">
                {t("conversionAmount")}
              </span>
              <span dir="ltr" className="font-medium!">
                {Number(conversionAmount || 0).toFixed(2)}{" "}
                {selectedGateway?.currency_code}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-gray-600 dark:text-gray-400">
                {t("totalFees")}
              </span>
              <span className=" font-medium!" dir="ltr">
                {(totalFee ?? 0)?.toFixed(2)} {selectedGateway?.currency_code}
              </span>
            </div>

            <div className="flex justify-between ">
              <span className="text-gray-600 dark:text-gray-400">
                {t("youWillGet")}
              </span>
              <span dir="ltr" className="font-medium!">
                {(youWillGet ?? 0)?.toFixed(2)} {selectedGateway?.currency_code}
              </span>
            </div>

            <div className="flex justify-between py-4 font-semibold text-base border-t border-gray-300 dark:border-gray-800 ">
              <span>{t("totalPayable")}</span>
              <span dir="ltr" className="font-bold! ">
                {(totalPayable ?? 0)?.toFixed(2)} {selectedCurrencyCode}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default memo(WithdrawSummery);
