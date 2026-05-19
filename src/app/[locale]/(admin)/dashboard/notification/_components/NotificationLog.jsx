"use client";
import { Card, Modal, Badge, Tabs } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { CheckCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} from "@/redux/api/notificationApi";
import showToast from "@/lib/toast";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import SearchInput from "@/components/ui/SearchInput";
import useDebounceSearch from "@/hooks/useDebounceSearch";

dayjs.extend(relativeTime);

const TYPE_STYLES = {
  mention: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  goal: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
  reject: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
  warning:
    "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  success:
    "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  default: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
};

const STATUS_FILTERS = [
  { key: "", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
];

export default function NotificationLog() {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleItem, setSingleItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeStatus, setActiveStatus] = useState("");
  const { smallScreen } = useViewport();

  const { debouncedSearchTerm, handleSearch, searchTerm } =
    useDebounceSearch(1000);

  const {
    data: notificationsData,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({
    page: currentPage,
    per_page: pageSize,
    search: debouncedSearchTerm,
    status: activeStatus,
  });

  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useMarkAllAsReadMutation();
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  // API returns `notifications` as a flat array (no pagination envelope).
  const allNotifications = notificationsData?.notifications || [];
  const unreadCount = allNotifications.filter((n) => n.seen === "0").length;

  // Status tabs and search are filtered client-side since the API doesn't
  // currently respect those query params for this endpoint.
  const statusFiltered =
    activeStatus === "unread"
      ? allNotifications.filter((n) => n.seen === "0")
      : activeStatus === "read"
        ? allNotifications.filter((n) => n.seen === "1")
        : allNotifications;

  const notifications = debouncedSearchTerm
    ? statusFiltered.filter((n) => {
        const q = debouncedSearchTerm.toLowerCase();
        const title = n.message?.title?.toLowerCase() ?? "";
        const body = n.message?.message?.toLowerCase() ?? "";
        return title.includes(q) || body.includes(q);
      })
    : statusFiltered;

  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await markAsRead(id).unwrap();
      showToast.apiSuccess(res);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await markAllAsRead().unwrap();
      showToast.apiSuccess(res);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const handleDeleteNotification = async () => {
    if (!deleteId) return;
    try {
      const res = await deleteNotification(deleteId).unwrap();
      showToast.apiSuccess(res);
      setDeleteId(null);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const handleOnRowClick = (record) => {
    setSingleItem(record);
    handleShowModal();
  };

  const getTypeClass = (type) => TYPE_STYLES[type] || TYPE_STYLES.default;

  const columns = [
    {
      title: "Notification",
      dataIndex: "id",
      render: (_id, record) => {
        const title = record.message?.title;
        const body = record.message?.message;
        const image = record.message?.image;
        const time = record.message?.time;
        const isUnread = record.seen === "0";
        return (
          <div className="flex items-center gap-3 py-0.5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-white text-sm font-bold uppercase">
                  {title?.charAt(0) || "N"}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p
                className={`text-sm! font-medium truncate ${
                  isUnread
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-neutral-400"
                }`}
              >
                {title}
              </p>
              <p className="text-xs! text-gray-500 dark:text-neutral-500 line-clamp-1">
                {body}
              </p>
              {smallScreen && time && (
                <p className="text-xs! text-gray-400 dark:text-neutral-600 mt-0.5">
                  {time}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    ...(!smallScreen
      ? [
          {
            title: "Time",
            dataIndex: "id",
            width: 150,
            render: (_id, record) => (
              <span className="text-gray-500 dark:text-neutral-500 text-sm! text-nowrap">
                {record.message?.time ?? "—"}
              </span>
            ),
          },
        ]
      : []),
    {
      title: "Status",
      dataIndex: "seen",
      width: 110,
      render: (seen) => {
        const isRead = seen === "1";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs! font-medium ${
              isRead
                ? "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-neutral-400"
                : "bg-primary-50 text-primary dark:bg-primary/20 dark:text-primary"
            }`}
          >
            {isRead ? "Read" : "Unread"}
          </span>
        );
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   width: 100,
    //   render: (id, record) => (
    //     <div
    //       className="flex items-center gap-1"
    //       onClick={(e) => e.stopPropagation()}
    //     >
    //       {record.seen === "0" && (
    //         <button
    //           onClick={(e) => handleMarkAsRead(id, e)}
    //           className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
    //           title="Mark as read"
    //         >
    //           <CheckCheck size={15} />
    //         </button>
    //       )}
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           setDeleteId(id);
    //         }}
    //         className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
    //         title="Delete"
    //       >
    //         <Trash2 size={15} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const tableData = notifications?.map((item, idx) => ({ ...item, key: idx }));

  const smallScreenColumns = smallScreen
    ? [columns[0], columns[columns.length - 1]]
    : columns;

  const tabItems = STATUS_FILTERS.map((filter) => ({
    key: filter.key,
    label:
      filter.key === "unread" && unreadCount > 0 ? (
        <span className="flex items-center gap-1.5">
          Unread
          <Badge count={unreadCount} size="small" />
        </span>
      ) : (
        filter.label
      ),
  }));

  const TableExtra = (
    <div className="flex items-center gap-3">
      {unreadCount > 0 && (
        <button
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-primary hover:bg-primary/10 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCheck size={14} />
          <span className="hidden sm:inline">Mark all read</span>
        </button>
      )}
      <SearchInput
        placeholder="Search notifications..."
        isFetching={isFetching}
        value={searchTerm}
        onChange={(val) => {
          handleSearch(val);
          setCurrentPage(1);
        }}
      />
    </div>
  );

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <BellOutlined className="text-primary" />
          <span>Notifications</span>
          {unreadCount > 0 && <Badge count={unreadCount} size="small" />}
        </div>
      }
      // extra={TableExtra}
    >
      {/* Detail Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Close"
      >
        {singleItem && (
          <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                {singleItem.message?.image ? (
                  <Image
                    src={singleItem.message.image}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-white text-base uppercase">
                    {singleItem.message?.title?.charAt(0) || "N"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base! font-normal! text-gray-900 dark:text-gray-100">
                  {singleItem.message?.title}
                </p>
                <p className="text-xs! text-gray-400 dark:text-slate-500 mb-2">
                  {singleItem.created_at &&
                    dayjs(singleItem.created_at).format("DD MMM YYYY, hh:mm A")}
                  {singleItem.message?.time && (
                    <>
                      {" · "}
                      {singleItem.message.time}
                    </>
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs! font-medium ${
                      singleItem.seen === "1"
                        ? "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-neutral-400"
                        : "bg-primary-50 text-primary dark:bg-primary/20 dark:text-primary"
                    }`}
                  >
                    {singleItem.seen === "1" ? "Read" : "Unread"}
                  </span>
                  {singleItem.type && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs! font-medium capitalize ${getTypeClass(singleItem.type)}`}
                    >
                      {singleItem.type}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Message body */}
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 text-xs! leading-relaxed text-gray-700 dark:text-gray-200">
              {singleItem.message?.message}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteNotification}
        loading={isDeleting}
        message="Are you sure you want to delete this notification? This action cannot be undone."
        confirmBtn="Delete"
        cancelBtn="Cancel"
      />

      {/* Status filter tabs */}
      <div className="mb-4">
        <Tabs
          activeKey={activeStatus}
          onChange={(key) => {
            setActiveStatus(key);
            setCurrentPage(1);
          }}
          items={tabItems}
          size="small"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          columns={smallScreenColumns}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
          onRowClick={handleOnRowClick}
          className="rounded-xl border border-gray-200/50 dark:border-neutral-950 md:min-w-[620px]"
          rowClassName={(record) =>
            `${
              record.seen === "0"
                ? "bg-primary-50/40 dark:bg-primary/[0.04]"
                : "even:bg-gray-50 dark:even:bg-slate-950"
            } rounded-xl cursor-pointer`
          }
        />
      </div>
    </Card>
  );
}
