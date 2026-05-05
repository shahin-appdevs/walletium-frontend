"use client";
import { Card, Modal } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import dayjs from "dayjs";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function TransactionHistory() {
  const t = useTranslations("Dashboard.home");
  const tc = useTranslations("common");
  const router = useRouter();
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();

  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen, mediumScreen } = useViewport();
  const { dashboardData, dashboardLoading } = useDashboardContext();

  if (dashboardLoading) return null;

  const data = dashboardData?.recent_transactions?.map((item, idx) => ({
    ...item,
    key: idx,
  }));

  const handleOnRowClick = (record) => {
    const labels = [
      t("transactions.type"),
      t("transactions.trxId"),
      t("transactions.date"),
      t("transactions.amount"),
      t("transactions.currency"),
      t("status.title"),
    ];
    const values = [
      "type",
      "trx_id",
      "created_at",
      "receive_amount",
      "request_currency",
      "status",
    ];

    const singleTableData = labels.map((item, idx) => {
      if (idx === 5) {
        // Status column
        switch (record[values[idx]]) {
          case 1:
            return {
              label: item,
              value: (
                <span className="text-green-500">{t("status.success")}</span>
              ),
            };

          case 2:
            return {
              label: item,
              value: (
                <span className="text-yellow-500">{t("status.pending")}</span>
              ),
            };

          case 3:
            return {
              label: item,
              value: (
                <span className="text-yellow-500">{t("status.hold")}</span>
              ),
            };

          default:
            return {
              label: item,
              value: (
                <span className="text-red-500">{t("status.rejected")}</span>
              ),
            };
        }
      }

      if (idx === 2) {
        // Date column
        return {
          label: item,
          value: dayjs(record[values[idx]]).format("DD MMM YYYY, hh:mm A"),
        };
      }

      return { label: item, value: record[values[idx]] };
    });

    setSingleTable(singleTableData);
    handleShowModal();
  };

  const columns = [
    {
      title: t("transactions.type"),
      dataIndex: "type",
      width: 250,
      render: (type) => {
        const isIn = type === "DEPOSIT";

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600">
              {isIn ? (
                <ArrowDownOutlined className="text-gray-500 rotate-45 text-lg" />
              ) : (
                <ArrowUpOutlined className="text-gray-500 rotate-45 text-lg" />
              )}
            </div>

            <div>
              <p className="text-sm! font-medium text-gray-800 dark:text-neutral-300">
                {type}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      title: t("transactions.trxId"),
      dataIndex: "trx_id",
      render: (id) => (
        <span
          dir="ltr"
          className="text-gray-600 dark:text-neutral-300"
        >{`#${id}`}</span>
      ),
    },
    {
      title: t("transactions.date"),
      dataIndex: "created_at",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {dayjs(date).format("DD MMM YYYY, hh:mm A")}
        </span>
      ),
    },
    {
      title: t("transactions.amount"),
      dataIndex: "receive_amount",
      render: (amount, record) => {
        return (
          <span dir="ltr" className={`font-semibold text-primary`}>
            +{amount?.toFixed(4)} {record?.request_currency}
          </span>
        );
      },
    },
    {
      title: t("transactions.currency"),
      dataIndex: "request_currency",
      render: (currency) => (
        <span className="text-gray-600 dark:text-neutral-300">{currency}</span>
      ),
    },
    {
      title: t("status.title"),
      dataIndex: "status",
      render: (status) => {
        const statusMap = {
          1: {
            label: t("status.success"),
            className:
              "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
          },
          2: {
            label: t("status.pending"),
            className:
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
          },
          3: {
            label: t("status.hold"),
            className:
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
          },
          4: {
            label: t("status.rejected"),
            className:
              "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
          },
        };

        const current = statusMap[status];

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm ${current?.className}`}
          >
            {current?.label}
          </span>
        );
      },
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;
  // const mediumScreenColumn = mediumScreen ? [...columns.slice(0, 4)] : columns;

  const TableExtra = (
    <PrimaryButton
      icon="ArrowUpRight"
      className={"text-sm w-full"}
      iconClassName={
        "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
      }
      onClick={() => router.push(`/dashboard/transactions/money-request-log`)}
    >
      {t("transactions.viewMore")}
    </PrimaryButton>
  );

  return (
    <Card
      title={<h5>{t("transactions.title")}</h5>}
      extra={TableExtra}
      className=" overflow-x-auto! dark:border-neutral-900! shadow-xs border-0!"
    >
      <Modal
        open={isModalOpen}
        onOk={handleCancelModal}
        okText={tc("action.close")}
        cancelButtonProps={{ style: { display: "none" } }}
        closeIcon={false}
      >
        <h4 className=" font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t("transactions.title")}
        </h4>
        <div className="w-full max-w-2xl mx-auto px-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {singleTable?.map((row, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 text-sm"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {row.label}
                </span>

                <span
                  className={`text-gray-900 dark:text-gray-100 ${
                    row.bold ? "font-semibold" : "font-medium"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      {/* Header */}
      {/* <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-4">
        <h4 className="font-bold text-neutral-800 dark:text-neutral-300">
          Transaction History
        </h4>
      </div> */}

      {/* Styled Table */}
      <Table
        columns={smallScreenColumn}
        dataSource={data}
        pagination={false}
        onRowClick={handleOnRowClick}
        className="rounded-xl  border! border-gray-200! dark:border-neutral-950! md:min-w-[820px]! "
        rowClassName={() =>
          "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
        }
      />
    </Card>
  );
}
