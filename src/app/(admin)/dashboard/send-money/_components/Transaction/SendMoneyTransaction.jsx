"use client";
import { Input, Button, Card, Modal } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";

const data = [
  {
    key: "1",
    transaction_type: "Receive Money",
    recipient_name: "Shahin",
    transaction_id: "TXID123",
    fee_charge: 20,
    exchange_rate: "2%",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: 2500,
    status: "Success",
    direction: "in",
  },
  {
    key: "2",
    transaction_type: "Money Out",
    recipient_name: "Shahin Hossain",
    transaction_id: "TXID123",
    fee_charge: 20,
    exchange_rate: "2%",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: -8600,
    status: "Success",
    direction: "out",
  },
  {
    key: "3",
    transaction_type: "Receive Money",
    recipient_name: "Shahin",
    transaction_id: "TXID123",
    fee_charge: 20,
    exchange_rate: "2%",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: -6140,
    status: "Success",
    direction: "out",
  },
  {
    key: "4",
    transaction_type: "Receive Money",
    recipient_name: "Shahin",
    transaction_id: "TXID123",
    fee_charge: 20,
    exchange_rate: "2%",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: 2500,
    status: "Success",
    direction: "in",
  },
];

export default function SendMoneyTransaction() {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen, mediumScreen } = useViewport();

  const handleOnRowClick = (record) => {
    const labels = [
      "Transaction Type",
      "TXID",
      "Recipient Name",
      "Amount",
      "Fee & Charge",
      "Total Amount",
      "Exchange Rate",
      "Date",
      "Status",
    ];
    const values = [
      "transaction_type",
      "transaction_id",
      "recipient_name",
      "amount",
      "fee_charge",
      "total_amount",
      "exchange_rate",
      "date",
      "status",
    ];

    const arr = labels.map((item, idx) => {
      return { label: item, value: record[values[idx]] };
    });

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: "Recipient Name",
      dataIndex: "recipient_name",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              record.direction === "in"
                ? "bg-gray-100 dark:bg-gray-300 dark:text-neutral-800"
                : "bg-gray-100 dark:bg-gray-300 dark:text-neutral-800"
            }`}
          >
            {record.direction === "in" ? (
              <ArrowDownOutlined className="text-gray-500 rotate-45 text-lg" />
            ) : (
              <ArrowUpOutlined className="text-gray-500 text-lg rotate-45" />
            )}
          </div>

          <div>
            <p className="font-medium text-gray-800 dark:text-neutral-300">
              {record.type}
            </p>
            <p className="text-gray-400  text-sm">{record.recipient_name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => (
        <span
          className={`font-semibold ${
            amount >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount >= 0
            ? `+$${amount.toLocaleString()}`
            : `-$${Math.abs(amount).toLocaleString()}`}
        </span>
      ),
    },
    {
      title: "Trx ID",
      dataIndex: "transaction_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">{id}</span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      render: (amount) => (
        <span
          className={`font-semibold ${
            amount >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount >= 0
            ? `+$${amount.toLocaleString()}`
            : `-$${Math.abs(amount).toLocaleString()}`}
        </span>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300">{date}</span>
      ),
    },

    {
      title: "Exchange Rate",
      dataIndex: "exchange_rate",
      render: (exchange_rate) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {exchange_rate}
        </span>
      ),
    },
    {
      title: "Fee/Charge",
      dataIndex: "fee_charge",
      render: (fee_charge) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {fee_charge}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-700 dark:text-green-100 text-green-700">
          {status}
        </span>
      ),
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;
  // const mediumScreenColumn = mediumScreen ? [...columns.slice(0, 4)] : columns;

  const Extra = (
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
  );

  return (
    <Card title="Latest Transaction" extra={Extra} className="overflow-x-auto!">
      <Modal open={isModalOpen} onCancel={handleCancelModal} closable={false}>
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-sm border border-gray-200 dark:border-gray-800">
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
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-300">
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
      <Table
        columns={smallScreenColumn}
        dataSource={data}
        pagination={false}
        onRowClick={handleOnRowClick}
        className="rounded-xl  border! border-gray-200/50! dark:border-neutral-950! md:min-w-[820px]! "
        rowClassName={() =>
          "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
        }
      />
    </Card>
  );
}
