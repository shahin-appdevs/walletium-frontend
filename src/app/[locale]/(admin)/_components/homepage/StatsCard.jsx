import { getImageUrl } from "@/utils/getImageUrl";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function CurrencyCard({ item }) {
  const t = useTranslations("Dashboard.home");
  const { flag, image_path, currency_code, currency_symbol, balance, name } =
    item;

  const profileImageUrl = getImageUrl(`${image_path}/${flag}`);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl  p-5 flex flex-col gap-5 overflow-hidden">
      {/* Top row: flag + name/code + menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="dark:bg-neutral-200 rounded-full p-2 bg-gray-100 shrink-0">
            <div className="w-10 h-10 rounded-full  overflow-hidden shrink-0">
            <Image
              src={profileImageUrl}
              alt={name}
              height={44}
              width={44}
              className="w-full h-full object-cover"
            />
          </div>
          </div>
          <div className="min-w-0">
            <p className="font-medium! text-neutral-900 dark:text-white text-sm sm:text-base truncate">
              {name}
            </p>
            <p className="text-xs! font-medium! text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mt-0.5">
              {currency_code}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors shrink-0 -mt-0.5"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Balance */}
      <div>
        <p className="text-sm! font-normal! text-neutral-800 dark:text-neutral-400 mb-1">
          {t("availableBalance")}
        </p>
        <h4
          dir="ltr"
          className="text-2xl!  font-bold text-neutral-900 dark:text-white rtl:text-right"
        >
          <span className="font-semibold! text-2xl!  text-neutral-700 dark:text-neutral-300">
            {currency_symbol}{" "}
          </span>
          {Number(balance || 0).toFixed(2)}
        </h4>
      </div>
    </div>
  );
}

export default CurrencyCard;
