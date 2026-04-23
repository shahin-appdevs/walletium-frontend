"use client";
import { Card, Result, Spin } from "antd";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useGetRequestMoneyInformationQuery } from "@/redux/api/requestMoneyApi";
import { DollarSign, Mail, Info, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function SharePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const locale = useLocale();

  const { data, isLoading, error } = useGetRequestMoneyInformationQuery(
    { token, lang: locale },
    { skip: !token }
  );

  if (!token) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Result
          status="404"
          title="Invalid Token"
          subTitle="The shareable link is missing a valid token."
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data?.data?.request_money_info) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Result
          status="error"
          title="Failed to load request info"
          subTitle="The request might be expired or the token is invalid."
        />
      </div>
    );
  }

  const info = data.data.request_money_info;

  const statusMap = {
    1: { label: "Pending", color: "text-amber-500", icon: <Clock className="w-5 h-5" /> },
    2: { label: "Success", color: "text-green-500", icon: <CheckCircle2 className="w-5 h-5" /> },
    3: { label: "Rejected", color: "text-red-500", icon: <XCircle className="w-5 h-5" /> },
  };

  const currentStatus = statusMap[info.status] || { label: "Unknown", color: "text-gray-500", icon: <Info className="w-5 h-5" /> };

  const summaryItems = [
    {
      label: "Recipient Email",
      value: info.receiver_email || "N/A",
      icon: <Mail className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Request Amount",
      value: `${Number(info.request_amount).toFixed(2)} ${info.request_currency}`,
      icon: <DollarSign className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Total Fees & Charges",
      value: `${Number(info.total_charge).toFixed(2)} ${info.request_currency}`,
      icon: <Info className="w-4 h-4 text-gray-400" />,
    },
    {
        label: "Total Payable",
        value: `${Number(info.total_payable).toFixed(2)} ${info.request_currency}`,
        icon: <DollarSign className="w-4 h-4 text-gray-400" />,
        isTotal: true,
      },
      {
        label: "Status",
        value: currentStatus.label,
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
            <span className="font-semibold text-lg">Money Request Details</span>
          </div>
        }
        className="shadow-md rounded-2xl overflow-hidden border-none"
      >
        <div className="bg-neutral-50 dark:bg-slate-900 mb-6 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-sm mb-1">Requested Amount</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" dir="ltr">
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
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</span>
                </div>
                <span className={`font-semibold ${item.isTotal ? "text-primary text-lg" : "text-gray-900 dark:text-gray-100"} ${item.customColor || ""}`} dir={item.isTotal ? "ltr" : ""}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {info.remark && (
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Remarks</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{info.remark}"</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
            <p>Token ID: {info.token}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
