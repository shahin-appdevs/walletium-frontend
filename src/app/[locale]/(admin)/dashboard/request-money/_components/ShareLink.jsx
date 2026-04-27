"use client";
import { Card, Result } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetRequestMoneyInformationQuery,
  useRequestMoneyConfirmMutation,
} from "@/redux/api/requestMoneyApi";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import showToast from "@/lib/toast";
import { DollarSign, Mail, Info, FileText } from "lucide-react";

import { statusMap } from "@/utils/statusMap";
import SharePageSkeleton from "./skeletons/SharePageSkeleton";

export default function ShareLink() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const locale = useLocale();
  const t = useTranslations("Dashboard.requestMoney.shareLink");
  const tc = useTranslations("common");
  const router = useRouter();

  const { data, isLoading, error } = useGetRequestMoneyInformationQuery(
    { token, lang: locale },
    { skip: !token },
  );

  const [confirmRequest, { isLoading: isConfirming }] =
    useRequestMoneyConfirmMutation();

  const handleConfirm = async () => {
    try {
      const res = await confirmRequest({
        payload: { token },
        lang: locale,
      }).unwrap();
      showToast.apiSuccess(res, tc("success.default"));
      router.replace(`/${locale}/dashboard/request-money`);
    } catch (err) {
      showToast.apiError(err, tc("error.default"));
    }
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Result
          status="404"
          title={t("invalidToken")}
          subTitle={t("invalidTokenSubtitle")}
        />
      </div>
    );
  }

  if (isLoading) {
    return <SharePageSkeleton />;
  }

  if (error || !data?.data?.request_money_info) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Result
          status="error"
          title={t("failedToLoad")}
          subTitle={t("failedToLoadSubtitle")}
        />
      </div>
    );
  }

  const info = data.data.request_money_info;

  const currentStatus = statusMap[info.status] || {
    label: t("statusUnknown"),
    color: "text-gray-500",
    icon: <Info className="w-5 h-5" />,
  };

  const summaryItems = [
    {
      label: t("recipientEmail"),
      value: info.receiver_email,
      icon: <Mail className="w-4 h-4 text-gray-400" />,
    },
    {
      label: t("requestAmount"),
      value: `${Number(info.request_amount).toFixed(2)} ${info.request_currency}`,
      icon: <DollarSign className="w-4 h-4 text-gray-400" />,
    },
    {
      label: t("totalFees"),
      value: `${Number(info.total_charge).toFixed(2)} ${info.request_currency}`,
      icon: <Info className="w-4 h-4 text-gray-400" />,
    },
    {
      label: t("totalPayable"),
      value: `${Number(info.total_payable).toFixed(2)} ${info.request_currency}`,
      icon: <DollarSign className="w-4 h-4 text-gray-400" />,
      isTotal: true,
    },
    {
      label: t("status"),
      value: (
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusMap[info.status]?.className || "bg-gray-100 text-gray-700"
          }`}
        >
          {statusMap[info.status]?.label}
        </div>
      ),
      icon: currentStatus.icon,
      customColor: currentStatus.color,
    },
  ];

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Card
        title={
          <div className="flex items-center gap-2 py-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">{t("cardTitle")}</span>
          </div>
        }
        className="shadow-md rounded-2xl overflow-hidden border-none"
      >
        <div className="bg-neutral-50 dark:bg-slate-900 mb-6 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 text-sm mb-1">
            {t("requestedAmountLabel")}
          </p>
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-white"
            dir="ltr"
          >
            {info.request_currency} {Number(info.request_amount).toFixed(2)}
          </h1>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3">
            {summaryItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center py-3 px-4 rounded-xl ${
                  item.isTotal ? "bg-primary-50 dark:bg-primary-900/20" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`font-semibold ${item.isTotal ? "text-primary text-lg" : "text-gray-900 dark:text-gray-100"} ${item.customColor || ""}`}
                  dir={item.isTotal ? "ltr" : ""}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {info.remark && (
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  {t("remarks")}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                {info.remark}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
            <p className="mb-4">
              {t("tokenID")}: {info.token}
            </p>
            {
              <PrimaryButton
                onClick={handleConfirm}
                loading={isConfirming}
                className="w-full text-base"
                icon={!isConfirming && "CheckCircle2"}
              >
                {t("confirmButton")}
              </PrimaryButton>
            }
          </div>
        </div>
      </Card>
    </div>
  );
}
