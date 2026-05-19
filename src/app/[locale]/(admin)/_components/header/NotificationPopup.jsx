"use client";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Skeleton } from "antd";
import NotificationItem from "@/app/[locale]/(admin)/dashboard/notification/_components/NotificationItem";
import { useGetNotificationsQuery } from "@/redux/api/notificationApi";

export default function NotificationPopup({ onClose }) {
  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useGetNotificationsQuery({
    page: 1,
    per_page: 5,
    status: "",
  });

  // API returns `notifications` as a flat array (not paginated).
  // Show the first 5 in the popup; the full list lives on /dashboard/notification.
  const notifications = (notificationsData?.notifications || []).slice(0, 5);
  // `unread_count` isn't on this endpoint — derive from `seen === "0"`.
  const unreadCount = notifications.filter((n) => n.seen === "0").length;

  return (
    <div className="z-50 w-[340px] rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-neutral-100 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="flex h-11 items-center justify-between px-4 border-b border-neutral-50 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-1.5 min-w-[18px] py-0.5 text-[10px] font-bold rounded-full bg-primary text-white text-center leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        <CloseOutlined
          onClick={onClose}
          className="cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-[10px]"
        />
      </div>

      {/* Notification list */}
      <div className="max-h-[320px] overflow-y-auto">
        {isLoading ? (
          <div className="p-3 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton.Avatar active size="small" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: "80%", height: 13 }}
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: "55%", height: 10 }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-6 text-center px-4">
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">
              Couldn&apos;t load notifications
            </p>
            <button
              onClick={() => refetch()}
              className="text-[11px] text-primary hover:opacity-70 transition-opacity"
            >
              Retry
            </button>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationItem key={item.id} notification={item} />
          ))
        ) : (
          <div className="py-8 text-center">
            <span className="text-2xl block mb-2">🔔</span>
            <p className="text-xs text-gray-400 dark:text-slate-500">
              No new notifications
            </p>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="border-t border-neutral-50 dark:border-slate-800">
        <Link
          href="/dashboard/notification"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2 font-bold text-primary-500! dark:text-primary-400 hover:bg-primary-100 transition-all"
        >
          See All Notifications
          <RightOutlined className="text-[9px]" />
        </Link>
      </div>
    </div>
  );
}
