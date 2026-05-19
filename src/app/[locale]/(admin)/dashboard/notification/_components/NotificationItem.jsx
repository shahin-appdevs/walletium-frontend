"use client";
import Image from "next/image";

/**
 * Renders a single notification row in the header popup.
 *
 * Expects the API shape:
 *   {
 *     id, type, seen,            // seen is the string "0" (unread) or "1" (read)
 *     created_at, updated_at,
 *     message: { title, message, image, time }   // `time` is pre-formatted by the backend
 *   }
 */
const NotificationItem = ({ notification, onClick }) => {
  const { message, seen } = notification;
  const title = message?.title;
  const body = message?.message;
  const image = message?.image;
  const time = message?.time;
  const isUnread = seen === "0";

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={`flex items-start gap-3 p-3 cursor-pointer
        border-b border-neutral-50 dark:border-slate-800 last:border-0
        transition-colors
        ${isUnread ? "bg-primary/[0.03] dark:bg-primary/[0.05]" : ""}
        hover:bg-slate-50 dark:hover:bg-slate-800/40`}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt=""
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="text-white text-[10px] font-bold uppercase">
            {title?.charAt(0) || "N"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px]! leading-snug ${
            isUnread
              ? "text-gray-800 dark:text-slate-200 font-medium"
              : "text-gray-600 dark:text-slate-400"
          }`}
        >
          {title}
        </p>
        <p className="text-[11px]! text-gray-500 dark:text-slate-500 mt-0.5 line-clamp-1">
          {body}
        </p>
        {time && (
          <p className="text-[10px]! text-gray-400 dark:text-slate-600 mt-0.5">
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
