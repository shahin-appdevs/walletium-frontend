"use client";

import { useGet2faInfoQuery } from "@/redux/api/authApi";
import { Card } from "antd";
import TwoFactorSkeleton from "./TwoFactorSkeleton";
import SecretKeyInput from "./SecretKeyInput";
import EnableDisableModal from "./EnableDisableModal";
import GoogleAuthenticatorCard from "./GoogleAuthenticatorCard";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TwoFactorAuthClient() {
  const t = useTranslations("Dashboard.security.2fa");
  const { data, isLoading, refetch } = useGet2faInfoQuery();

  if (isLoading) return <TwoFactorSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT CARD */}
      <Card className="border  rounded-xl" title={t("authenticatorTitle")}>
        <label className="text-sm font-medium block mb-2">
          {t("authenticatorLabel")}
        </label>

        <SecretKeyInput secretKey={data?.qr_secrete} />

        <div className="flex justify-center mb-6">
          <Image src={data?.qr_code} alt="QR Code" width={160} height={160} />
        </div>

        <EnableDisableModal status={data?.status} refetch2faStatus={refetch} />
      </Card>

      {/* RIGHT CARD */}
      <GoogleAuthenticatorCard />
    </div>
  );
}
