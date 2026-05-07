"use client";
import React from "react";
import { Result, Button, Card } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const TransactionFailed = ({
  title = "Transaction Failed",
  errorMsg = "Your transaction could not be processed at this time. Please check your balance or payment details.",
  onRetry,
  retryText = "Try Again",
}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-2xl shadow-lg border-none bg-white dark:bg-slate-900 rounded-2xl!">
        <Result
          status="error"
          icon={<CloseCircleFilled className="text-red-500 text-6xl" />}
          title={
            <span className="dark:text-white text-2xl! font-bold">{title}</span>
          }
          subTitle={
            <span className="dark:text-slate-400 max-w-md mx-auto">
              {errorMsg}
            </span>
          }
          extra={[
            <div
              key="actions"
              className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
            >
              <Button
                type="primary"
                danger
                size="large"
                className="h-12 px-8 rounded-lg"
                onClick={onRetry}
              >
                {retryText}
              </Button>
              {/* <Button
                size="large"
                className="h-12 px-8 rounded-lg dark:bg-slate-800 dark:text-white dark:border-slate-700"
                onClick={onSupportClick || (() => router.push("/support"))}
              >
                {supportText}
              </Button> */}
            </div>,
          ]}
        ></Result>
      </Card>
    </div>
  );
};

export default TransactionFailed;
