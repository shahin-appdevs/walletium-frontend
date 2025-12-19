import LucideIcon from "@/components/LucideIcon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Reusable Currency Card Component
function MyCardStatsCard({ icon, name, value, bg, iconColor }) {
  return (
    <div className="bg-neutral-50 dark-border! border border-neutral-200/50  items-center justify-center dark:bg-slate-900 rounded-2xl  p-4 flex flex-col gap-3 overflow-hidden">
      {/* Icon Section */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}
          // style={{ boxShadow: `2px 2px 10px ` }}
        >
          {/* <Image
            src={icon}
            height={50}
            width={50}
            alt={name}
            className=" h-6 w-6 "
          /> */}
          <LucideIcon name={icon} className={iconColor} />
        </div>
        {/* <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${iconColor}`}
        >
          <ArrowUpRight className="w-4 h-4 text-white dark:text-neutral-800" />
        </div> */}
      </div>

      {/* Text Section */}

      <div className="text-center ">
        <p className="text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
          {value}
        </p>
        <p className="text-gray-500 text-sm">{name}</p>
      </div>
    </div>
  );
}
export default MyCardStatsCard;
