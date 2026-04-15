import Link from "next/link";
import { Card } from "antd";
import { XCircle, UserX, FileText } from "lucide-react";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default function KycVerificationRejected() {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md dark:bg-neutral-900">
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          KYC Verification Rejected
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Unfortunately, your identity verification was not approved. Please
          review your documents and try again.
        </p>

        {/* Info Section */}
        <div className="mt-4 w-full space-y-3 text-left">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
            <UserX className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-700 dark:text-neutral-300">
              Identity Verification Failed
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
            <FileText className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-700 dark:text-neutral-300">
              Documents Rejected
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
