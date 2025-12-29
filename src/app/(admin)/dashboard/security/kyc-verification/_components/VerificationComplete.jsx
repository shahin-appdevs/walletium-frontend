import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Card, Button } from "antd";
import { CheckCircle, FileText, UserCheck } from "lucide-react";
import Link from "next/link";

const VerificationComplete = () => {
  return (
    <div>
      <Card className="w-full max-w-md rounded-2xl shadow-md dark:bg-neutral-900 ">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
            <CheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            KYC Verification Completed
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Your identity has been successfully verified. You now have full
            access to all features and services.
          </p>

          {/* Info Section */}
          <div className="mt-4 w-full space-y-3 text-left">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-700 dark:text-neutral-300">
                Identity Verified
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
              <FileText className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-700 dark:text-neutral-300">
                Documents Approved
              </span>
            </div>
          </div>

          {/* Action */}
          <Link href={"/dashboard"}>
            <PrimaryButton
              icon="ArrowUpRight"
              className="mt-6"
              iconClassName={
                "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
              }
            >
              Go to Dashboard
            </PrimaryButton>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default VerificationComplete;
