import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function GoogleAuthenticatorCard() {
  const t = useTranslations("Dashboard.security.2fa");

  return (
    <Card className="border rounded-xl" title={t("googleTitle")}>
      <h3 className="font-medium mb-2">{t("downloadTitle")}</h3>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        {t("googleDescription")}{" "}
        <span className="text-primary-600 cursor-pointer ml-1">
          {t("howToSetup")}
        </span>
      </p>

      <div className="flex justify-center mb-6">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Google_Authenticator_%28April_2023%29.svg/500px-Google_Authenticator_%28April_2023%29.svg.png"
          alt="Google Authenticator"
          width={140}
          height={140}
        />
      </div>

      <Link
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share"
        target="_blank"
      >
        <PrimaryButton className="w-full">{t("downloadApp")}</PrimaryButton>
      </Link>
    </Card>
  );
}
