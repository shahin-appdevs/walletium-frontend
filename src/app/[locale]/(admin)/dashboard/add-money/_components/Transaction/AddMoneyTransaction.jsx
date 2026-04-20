"use client";
import { Input, Card, Modal } from "antd";
import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { memo, useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
import LucideIcon from "@/components/LucideIcon";

const statusMap = {
  1: {
    text: "Success",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
  },
  2: {
    text: "Pending",
    className:
      "bg-yellow-100/50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
  },
  3: {
    text: "Rejected",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
  },
};

const AddMoneyTransaction = memo(function AddMoneyTransaction({
  transactionsData,
  loading,
}) {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();

  const transactions = transactionsData?.transactions?.data;

  const handleOnRowClick = (record) => {
    const arr = [
      { label: "Transaction Type", value: record.type },
      { label: "Gateway Currency", value: record.gateway_currency },
      { label: "TXID", value: record.trx_id },
      {
        label: "Amount",
        value: `${record.request_amount} ${record.request_currency}`,
      },
      {
        label: "Fee & Charge",
        value: `${record.total_charge} ${record.request_currency}`,
      },
      {
        label: "Total Amount",
        value: `${record.total_payable} ${record.request_currency}`,
      },
      {
        label: "Exchange Rate",
        value: `1 ${record.request_currency} = ${record.exchange_rate} ${record.payment_currency}`,
      },
      {
        label: "Date",
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
        label: "Status",
        value: statusMap[record.status]?.text || "Unknown",
        bold: true,
      },
    ];

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-300 dark:text-neutral-800`}
          >
            <ArrowDownOutlined className="text-gray-500 rotate-45 text-lg" />
          </div>

          <div>
            <p className="font-medium text-gray-800 dark:text-neutral-300">
              {record.type}
            </p>
            <p className="text-gray-400 text-sm whitespace-nowrap">
              {record.gateway_currency}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span className="font-semibold text-green-600 whitespace-nowrap">
          + {Number(amount).toFixed(2)} {record.request_currency}
        </span>
      ),
    },
    {
      title: "Trx ID",
      dataIndex: "trx_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">{id}</span>
      ),
    },
    {
      title: "Total Payable",
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span className="font-semibold text-gray-800 dark:text-neutral-300">
          {Number(amount).toFixed(2)} {record.request_currency}
        </span>
      ),
    },

    {
      title: "Date",
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
      title: "Exchange Rate",
      dataIndex: "exchange_rate",
      render: (rate, record) => (
        <span className="text-gray-600 dark:text-neutral-300 whitespace-nowrap">
          1 {record.request_currency} = {rate} {record.payment_currency}
        </span>
      ),
    },
    {
      title: "Fee/Charge",
      dataIndex: "total_charge",
      render: (charge, record) => (
        <span className="text-red-500">
          {charge} {record.request_currency}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const mapped = statusMap[status] || { text: "Unknown", className: "" };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${mapped.className}`}
          >
            {mapped.text}
          </span>
        );
      },
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;
  // const mediumScreenColumn = mediumScreen ? [...columns.slice(0, 4)] : columns;

  const TableExtra = (
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className="hidden md:block">
        <Input
          placeholder="Search"
          size="large"
          prefix={<SearchOutlined className="text-gray-400" />}
          className=" rounded-lg"
        />
      </div>
      <div className="md:hidden">
        <PrimaryButton
          icon={"Search"}
          iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
        ></PrimaryButton>
      </div>
      <div className=" md:flex justify-end ">
        <Link href={"#"}>
          <PrimaryButton>
            <span className="hidden md:block">View More</span>
            <span>
              <LucideIcon name={"Eye"} size={20} />
            </span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );

  return (
    <Card title="Latest Transaction" extra={TableExtra}>
      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        closable={false}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Latest Transaction
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
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-300">
          Latest Transaction
        </h2>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-48 rounded-lg"
          />
          <Button icon={<FilterOutlined />} className="rounded-lg">
            Filter
          </Button>
        </div>
      </div> */}

      {/* Styled Table */}
      <div className="overflow-x-auto!">
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
