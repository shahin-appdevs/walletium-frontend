"use client";
import { Card, Modal } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { memo, useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";

const AddMoneyTransaction = memo(function AddMoneyTransaction({
  transactionsData,
  loading,
  t,
}) {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();

  const statusMap = {
    1: {
      text: t("status.success"),
      className:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    2: {
      text: t("status.pending"),
      className:
        "bg-yellow-100/50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
      iconClass:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    },
    3: {
      text: t("status.rejected"),
      className:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
      iconClass: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },
  };

  const transactions = transactionsData?.transactions?.data;

  const handleOnRowClick = (record) => {
    const arr = [
      { label: t("type"), value: record.type },
      { label: t("gatewayCurrency"), value: record.gateway_currency },
      { label: t("trxId"), value: record.trx_id },
      {
        label: t("amount"),
        value: `${record.request_amount} ${record.request_currency}`,
      },
      {
        label: t("feeCharge"),
        value: `${record.total_charge} ${record.request_currency}`,
      },
      {
        label: t("totalPayable"),
        value: `${record.total_payable} ${record.request_currency}`,
      },
      {
        label: t("exchangeRate"),
        value: `1 ${record.request_currency} = ${record.exchange_rate} ${record.payment_currency}`,
      },
      {
        label: t("date"),
        value: new Date(record.created_at).toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      },
      {
        label: t("status.title"),
        value: statusMap[record.status]?.text || "Unknown",
        bold: true,
      },
    ];

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: <span className="whitespace-nowrap">{t("type")}</span>,
      dataIndex: "type",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              statusMap[record.status]?.iconClass ||
              "bg-gray-100 dark:bg-gray-300 dark:text-neutral-800"
            }`}
          >
            <ArrowDownOutlined className="rotate-45 text-lg" />
          </div>

          <div>
            <p className="font-medium text-gray-800 dark:text-neutral-300 ">
              {record?.type}
            </p>
            <p className="text-gray-400 whitespace-nowrap text-xs!">
              {record?.gateway_currency}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("amount")}</span>,
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span
          dir="ltr"
          className="font-semibold text-green-600 whitespace-nowrap"
        >
          +{Number(amount).toFixed(2)} {record.request_currency}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("trxId")}</span>,
      dataIndex: "trx_id",
      render: (id) => (
        <span dir="ltr" className="text-gray-600 dark:text-neutral-300">
          #{id}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("totalPayable")}</span>,
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span
          dir="ltr"
          className="font-semibold text-red-500 dark:text-neutral-300 whitespace-nowrap"
        >
          -{Number(amount).toFixed(2)} {record.payment_currency}
        </span>
      ),
    },

    {
      title: <span className="whitespace-nowrap">{t("date")}</span>,
      dataIndex: "created_at",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300 whitespace-nowrap">
          {new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },

    {
      title: <span className="whitespace-nowrap">{t("exchangeRate")}</span>,
      dataIndex: "exchange_rate",
      render: (rate, record) => (
        <span
          dir="ltr"
          className="text-gray-600 dark:text-neutral-300 whitespace-nowrap"
        >
          1 {record.request_currency} = {Number(rate || 0).toFixed(2)}{" "}
          {record.payment_currency}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("feeCharge")}</span>,
      dataIndex: "total_charge",
      render: (charge, record) => (
        <span dir="ltr" className="text-red-500">
          -{Number(charge || 0).toFixed(2)} {record.payment_currency}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("status.title")}</span>,
      dataIndex: "status",
      render: (status) => {
        const mapped = statusMap[status] || { text: "Unknown", className: "" };
        return (
          <p
            className={`px-3 py-1! rounded-full text-xs! font-medium text-nowrap w-full text-center ${mapped.className}`}
          >
            {mapped.text}
          </p>
        );
      },
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;
  // const mediumScreenColumn = mediumScreen ? [...columns.slice(0, 4)] : columns;

  const TableExtra = (
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className=" md:flex justify-end ">
        <Link href={`/dashboard/transactions/add-money-log`}>
          <PrimaryButton
            icon="ArrowUpRight"
            className={" w-full"}
            iconClassName={
              "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
            }
          >
            <span className="hidden md:block">{t("viewMore")}</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );

  return (
    <Card title={t("title")} extra={TableExtra}>
      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        closable={false}
        cancelText={t("close")}
        okButtonProps={{ style: { display: "none" } }}
      >
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
                  dir="ltr"
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

      {/* Styled Table */}
      <div className="overflow-x-auto! overflow-y-hidden">
        <Table
          columns={smallScreenColumn}
          dataSource={transactions}
          loading={loading}
          pagination={false}
          onRowClick={handleOnRowClick}
          rowKey="id"
          className="rounded-xl border! border-gray-200/50! dark:border-neutral-950! md:min-w-[820px]! "
          rowClassName={() =>
            "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
          }
        />
      </div>
    </Card>
  );
});

export default AddMoneyTransaction;
