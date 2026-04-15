import Link from "next/link";
import { Card } from "antd";
import { Clock, User, FileText } from "lucide-react";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default function KycVerificationPending() {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md dark:bg-neutral-900">
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
          <Clock className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          KYC Verification Pending
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Your identity verification is still in process. Please wait until our
          team reviews your documents.
        </p>

        {/* Info Section */}
        <div className="mt-4 w-full space-y-3 text-left">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
            <User className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-700 dark:text-neutral-300">
              Identity Verification Pending
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
            <FileText className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-700 dark:text-neutral-300">
              Documents Under Review
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
  );
}
