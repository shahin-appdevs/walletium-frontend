import { getImageUrl } from "@/utils/getImageUrl";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Reusable Currency Card Component
function CurrencyCard({ item }) {
  const { flag, image_path, currency_code, currency_symbol, balance, name } =
    item;

  const profileImageUrl = getImageUrl(`${image_path}/${flag}`);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
      {/* Icon Section */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-primary-50 dark:bg-primary-500/10  `}
          // style={{ boxShadow: `2px 2px 10px ` }}
        >
          <Image
            src={profileImageUrl}
            height={50}
            width={50}
            alt={name}
            className="w-6"
          />
          {/* <span className="font-bold text-lg">{icon}</span> */}
        </div>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center `}
        >
          <ArrowUpRight className="w-4 h-4 text-white dark:text-neutral-800" />
        </div>
      </div>

      {/* Text Section */}
      <div>
        <p className="text-gray-500 text-sm!">
          {name} ({currency_code})
        </p>
        <h4 className="text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
          <span className="text-neutral-700 dark:text-neutral-200">
            {currency_symbol}
          </span>{" "}
          {balance}
        </h4>
      </div>
    </div>
  );
}
export default CurrencyCard;
