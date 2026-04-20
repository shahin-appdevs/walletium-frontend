"use client";

import { Card } from "antd";
import Link from "next/link";
import LucideIcon from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import DynamicVerificationForm from "./VerificationForm";
import { useTranslations } from "next-intl";

const KYCVerification = ({ inputFields, verifyRefetch }) => {
  const router = useRouter();
  const t = useTranslations("Dashboard.security.kyc");

  return (
    <Card className="max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {t("Form.title")}{" "}
          <span className="text-sm text-pink-600 font-normal">
            ● {t("Unverified.tag")}
          </span>
        </h2>
        <p className="text-gray-500 mt-1">{t("Form.subTitle")}</p>
      </div>

      {/* verification form */}
      <DynamicVerificationForm
        inputFields={inputFields}
        verifyRefetch={verifyRefetch}
      />
      {/* Back Link */}
      <div className="mt-4">
        <Link href="/dashboard">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center gap-1 bg-primary-50 rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon name={"ArrowLeft"} size={18} />
            <span className="hidden md:block">{t("Form.backButton")}</span>
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default KYCVerification;
