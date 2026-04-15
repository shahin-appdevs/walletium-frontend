"use client";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import showToast from "@/lib/toast";
import { Input } from "antd";
import { useTranslations } from "next-intl";

export default function SecretKeyInput({ secretKey }) {
  const t = useTranslations("Dashboard.security.2fa");
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
      showToast.success(t("copiedSuccess"));
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="flex items-center mb-6 gap-2">
      <Input
        value={secretKey}
        readOnly
        size="large"
        className="rounded-r-none"
      />
      <PrimaryButton
        onClick={copyToClipboard}
        icon="Copy"
        iconClassName="group-hover/primary-btn:scale-110 duration-200"
      >
        {t("copy")}
      </PrimaryButton>
    </div>
  );
}
