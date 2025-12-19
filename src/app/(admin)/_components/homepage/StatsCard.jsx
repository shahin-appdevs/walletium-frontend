import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Reusable Currency Card Component
function CurrencyCard({ icon, name, amount, bg, iconBg }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
      {/* Icon Section */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}
          // style={{ boxShadow: `2px 2px 10px ` }}
        >
          <Image
            src={icon}
            height={50}
            width={50}
            alt={name}
            className=" h-6 w-6 "
          />
        </div>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${iconBg}`}
        >
          <ArrowUpRight className="w-4 h-4 text-white dark:text-neutral-800" />
        </div>
      </div>

      {/* Text Section */}
      <div>
        <p className="text-gray-500 text-sm">{name}</p>
        <p className="text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
          {amount}
        </p>
      </div>
    </div>
  );
}
export default CurrencyCard;
