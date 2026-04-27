"use client";
import { Card, Modal } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useTranslations, useLocale } from "next-intl";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";
import dayjs from "dayjs";

export default function WithdrawTransaction() {
  const t = useTranslations("Dashboard.withdrawMoney.transaction");
  const locale = useLocale();
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();

  const { data: transactionsData, isLoading } = useGetTransactionsQuery({
    type: "money-out",
    page: 1,
    per_page: 5,
    lang: locale,
  });

  const handleOnRowClick = (record) => {
    const labels = [
      t("type"),
      t("trxId"),
      t("amount"),
      t("feeCharge"),
      t("totalPayable"),
      t("exchangeRate"),
      t("date"),
      t("status"),
    ];
    const values = [
      "type",
      "trx_id",
      "receive_amount",
      "total_charge",
      "total_payable",
      "exchange_rate",
      "created_at",
      "status",
    ];

    const arr = labels.map((item, idx) => {
      let value = record[values[idx]];
      if (values[idx] === "created_at") {
        value = dayjs(value).format("DD MMM YYYY, hh:mm A");
      }
      if (values[idx] === "status") {
        const statuses = {
            1: "Success",
            2: "Pending",
            3: "Hold",
            4: "Rejected"
        };
        value = statuses[value] || "Unknown";
      }
      return { label: item, value: value };
    });

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: t("type"),
      dataIndex: "type",
      width: 250,
      render: (type) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-300">
            <ArrowUpOutlined className="text-gray-500 text-lg rotate-45" />
          </div>

          <div>
            <p className="font-medium text-gray-800 dark:text-neutral-300">
              {type}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t("amount"),
      dataIndex: "receive_amount",
      render: (amount, record) => (
        <span className="font-semibold text-red-500" dir="ltr">
          -{amount?.toFixed(4)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: t("trxId"),
      dataIndex: "trx_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">{id}</span>
      ),
    },
    {
      title: t("totalPayable"),
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span className="font-semibold text-red-500" dir="ltr">
          {amount?.toFixed(4)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: t("date"),
      dataIndex: "created_at",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {dayjs(date).format("DD MMM YYYY, hh:mm A")}
        </span>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      render: (status) => {
        const statusMap = {
          1: { label: "Success", className: "bg-green-100 text-green-700" },
          2: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
          3: { label: "Hold", className: "bg-yellow-100 text-yellow-700" },
          4: { label: "Rejected", className: "bg-red-100 text-red-700" },
        };
        const current = statusMap[status] || { label: "Unknown", className: "bg-gray-100 text-gray-700" };
        return (
          <span className={`px-3 py-1 rounded-full text-sm ${current.className}`}>
            {current.label}
          </span>
        );
      },
    },
  ];

  const tableData = transactionsData?.data?.transactions?.map((item, idx) => ({
    ...item,
    key: idx,
  }));

  const TableExtra = (
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className=" md:flex justify-end ">
          <PrimaryButton
            icon="ArrowUpRight"
            iconClassName={
              "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
            }
          >
            <span className="hidden md:block">{t("viewMore")}</span>
          </PrimaryButton>
      </div>
    </div>
  );

  return (
    <Card title={t("title")} extra={TableExtra}>
      <Modal open={isModalOpen} onCancel={handleCancelModal} closable={false}>
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("title")}
          </h2>

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
                  className={`text-gray-900 dark:text-gray-100 font-medium`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <div className="overflow-x-auto!">
        <Table
          columns={smallScreen ? columns.slice(0, 2) : columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
          onRowClick={handleOnRowClick}
          className="rounded-xl border border-gray-200/50 dark:border-neutral-950 md:min-w-[820px]"
          rowClassName={() =>
            "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl cursor-pointer"
          }
        />
      </div>
    </Card>
  );
}
