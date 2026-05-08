"use client";
import React from "react";
import { Result, Button, Card } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const TransactionSuccess = ({
  title = "Transaction Successful!",
  subTitle = "Your request has been processed. It may take a few minutes to reflect in your balance.",
  amount,
  transactionId,
  onPrimaryClick,
  primaryText = "Back to Dashboard",
  secondaryText = "View History",
  onSecondaryClick,
  redirectLink = "/dashboard",
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-2xl shadow-lg border-none bg-white dark:bg-slate-900 rounded-2xl!">
        <Result
          status="success"
          icon={<CheckCircleFilled className="text-green-500 text-6xl" />}
          title={
            <span className="dark:text-white text-2xl! font-bold">{title}</span>
          }
          subTitle={<span className="dark:text-slate-400">{subTitle}</span>}
          extra={[
            <div
              key="actions"
              className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
            >
              <Button
                type="primary"
                size="large"
                className="h-12 px-8 rounded-lg"
                onClick={onPrimaryClick || (() => router.push(redirectLink))}
              >
                {primaryText}
              </Button>
              {secondaryText && (
                <Button
                  size="large"
                  className="h-12 px-8 rounded-lg dark:bg-slate-800 dark:text-white dark:border-slate-700"
                  onClick={onSecondaryClick}
                >
                  {secondaryText}
                </Button>
              )}
            </div>,
          ]}
        >
          {/* Optional: Transaction Details Summary */}
          {(amount || transactionId) && (
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between mb-3">
                <span className="text-slate-500 dark:text-slate-400">
                  Amount:
                </span>
                <span className="font-semibold dark:text-white text-lg">
                  {amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Transaction ID:
                </span>
                <span className="font-mono text-sm dark:text-slate-300">
                  {transactionId}
                </span>
              </div>
            </div>
          )}
        </Result>
      </Card>
    </div>
  );
};

export default TransactionSuccess;
