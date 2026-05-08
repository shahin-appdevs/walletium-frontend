"use client";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import LucideIcon from "@/components/LucideIcon";
import Link from "next/link";

// Define a type-to-color map to handle dynamic data logic
const typeStyles = {
  mention: "bg-blue-500",
  goal: "bg-indigo-500",
  reject: "bg-red-500",
  default: "bg-slate-500",
};

export const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    name: "Zayan Ahmed",
    action: "requested a withdrawal of $500",
    time: "2 mins ago",
    type: "mention", // Matches "bg-blue-500"
  },
  {
    id: 2,
    name: "System Bot",
    action: "successfully updated the Arabic translation files",
    time: "1h ago",
    type: "goal", // Matches "bg-indigo-500"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    action: "rejected the recipient request for eBuy project",
    time: "3h ago",
    type: "reject", // Matches "bg-red-500"
  },
  {
    id: 4,
    name: "Omar Al-Farsi",
    action: "shared a new document in the Finance thread",
    time: "Yesterday at 10:45 PM",
    type: "mention",
  },
  {
    id: 5,
    name: "Admin Support",
    action: "Your KYC verification is currently on hold",
    time: "May 7, 2026",
    type: "default", // Matches "bg-slate-500"
  },
];

export default function NotificationPopup({ notifications = [], onClose }) {
  return (
    <div className="z-50 w-[340px] rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-neutral-100 dark:border-slate-800 overflow-hidden">
      {/* Header - Tightened height */}
      <div className="flex h-11 items-center justify-between px-4 border-b border-neutral-50 dark:border-slate-800">
        <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">
          Notifications
        </span>
        <CloseOutlined
          onClick={onClose}
          className="cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-[10px]"
        />
      </div>

      {/* List - Minimal vertical padding */}
      <div className="max-h-[320px] overflow-y-auto">
        {DUMMY_NOTIFICATIONS.length > 0 ? (
          DUMMY_NOTIFICATIONS.map((item) => {
            // Dynamically select color based on item type
            const bgColor = typeStyles[item.type] || typeStyles.default;

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer border-b border-neutral-50 dark:border-slate-800 last:border-0"
              >
                {/* Dynamic Avatar */}
                <div
                  className={`w-8 h-8 rounded-full ${bgColor} shrink-0 flex items-center justify-center`}
                >
                  <span className="text-white text-[10px] font-bold uppercase">
                    {item.name?.charAt(0) || "N"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-700 dark:text-slate-300 leading-tight">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </span>{" "}
                    {item.action}
                  </span>
                  {/* Reduced time padding */}
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 ">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-xs text-gray-400">
            No new notifications
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="border-t border-neutral-50 dark:border-slate-800">
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2  font-bold text-primary-500! dark:text-primary-400 hover:bg-primary-100  transition-all"
        >
          See All Notifications
          <RightOutlined className="text-[9px]" />
        </Link>
      </div>
    </div>
  );
}
