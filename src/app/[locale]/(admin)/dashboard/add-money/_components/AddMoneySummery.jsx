import { Alert, Card } from "antd";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function AddMoneySummery({
  amount,
  selectedCurrencyCode,
  totalFee,
  youWillReceive,
  selectedGateway,
}) {
  return (
    <Card title="Summary" className="h-full">
      <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <div className="flex justify-between py-3">
            <span className="text-gray-600 dark:text-gray-400">
              Entered Amount
            </span>
            <span>
              {amount || 0} {selectedCurrencyCode}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600 dark:text-gray-400">
              Total Fees & Charges
            </span>
            <span className="text-red-600">
              {totalFee} {selectedCurrencyCode}
            </span>
          </div>
          <div className="flex justify-between py-4 font-semibold text-base border-t">
            <span>You will receive</span>
            <span>
              {youWillReceive} {selectedCurrencyCode}
            </span>
          </div>
        </div>

        {selectedGateway?.type === "MANUAL" && (
          <Alert
            message="Manual Payment"
            description="Upload payment proof after making the transfer."
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
