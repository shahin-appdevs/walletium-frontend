import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Card } from "antd";
import { CheckCircle, FileText, UserCheck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const VerificationComplete = () => {
  const t = useTranslations("Dashboard.security.kyc.Complete");
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
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {t("description")}
          </p>

          {/* Info Section */}
          <div className="mt-4 w-full space-y-3 text-left">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-700 dark:text-neutral-300">
                {t("identity")}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-neutral-800">
              <FileText className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-700 dark:text-neutral-300">
                {t("documents")}
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
              {t("button")}
            </PrimaryButton>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default VerificationComplete;
