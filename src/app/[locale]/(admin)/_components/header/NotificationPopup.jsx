"use client";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "antd";
import NotificationItem from "@/app/[locale]/(admin)/dashboard/notification/_components/NotificationItem";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "@/redux/api/notificationApi";

export default function NotificationPopup({ onClose }) {
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    page: 1,
    per_page: 5,
    status: "",
  });

  const [markAsRead]                        = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllAsReadMutation();

  const notifications = notificationsData?.notifications?.data || [];
  const unreadCount   = notificationsData?.unread_count || 0;

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch {}
  };

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

        <div className="flex items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAll}
              className="flex items-center gap-0.5 text-[11px] text-primary hover:opacity-70 transition-opacity disabled:opacity-40"
              title="Mark all as read"
            >
              <CheckCheck size={11} />
              All read
            </button>
          )}
          <CloseOutlined
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-[10px]"
          />
        </div>
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
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              onMarkAsRead={handleMarkAsRead}
            />
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
