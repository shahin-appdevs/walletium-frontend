"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckCheck } from "lucide-react";

dayjs.extend(relativeTime);

const TYPE_AVATAR_COLORS = {
  mention: "bg-blue-500",
  goal:    "bg-indigo-500",
  reject:  "bg-red-500",
  warning: "bg-amber-500",
  success: "bg-green-500",
  default: "bg-slate-500",
};

const NotificationItem = ({ notification, onMarkAsRead, onClick }) => {
  const { id, title, message, type, is_read, created_at } = notification;
  const avatarBg = TYPE_AVATAR_COLORS[type] || TYPE_AVATAR_COLORS.default;

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={`flex items-start gap-3 p-3 cursor-pointer
        border-b border-neutral-50 dark:border-slate-800 last:border-0
        transition-colors
        ${!is_read ? "bg-primary/[0.03] dark:bg-primary/[0.05]" : ""}
        hover:bg-slate-50 dark:hover:bg-slate-800/40`}
    >
      {/* Avatar with type color */}
      <div
        className={`w-8 h-8 rounded-full ${avatarBg} shrink-0 flex items-center justify-center`}
      >
        <span className="text-white text-[10px] font-bold uppercase">
          {title?.charAt(0) || "N"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] leading-snug ${
            is_read
              ? "text-gray-600 dark:text-slate-400"
              : "text-gray-800 dark:text-slate-200 font-medium"
          }`}
        >
          {title}
        </p>
        <p className="text-[11px] text-gray-500 dark:text-slate-500 mt-0.5 line-clamp-1">
          {message}
        </p>
        <p className="text-[10px] text-gray-400 dark:text-slate-600 mt-0.5">
          {dayjs(created_at).fromNow()}
        </p>
      </div>

      {/* Unread dot + mark-as-read */}
      <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
        {!is_read && (
          <>
            <span className="w-2 h-2 rounded-full bg-primary" />
            {onMarkAsRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(id);
                }}
                className="text-primary hover:opacity-70 transition-opacity"
                title="Mark as read"
              >
                <CheckCheck size={12} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
