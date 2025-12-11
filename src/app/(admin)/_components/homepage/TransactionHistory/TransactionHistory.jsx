"use client";
import { Input, Button, Card } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import Table from "@/components/ui/Table";

const data = [
  {
    key: "1",
    type: "Receive Money",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: 2500,
    status: "Success",
    direction: "in",
  },
  {
    key: "2",
    type: "Money Out",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: -8600,
    status: "Success",
    direction: "out",
  },
  {
    key: "3",
    type: "Receive Money",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: -6140,
    status: "Success",
    direction: "out",
  },
  {
    key: "4",
    type: "Receive Money",
    date: "07 Jun 2025",
    id: "#MY548G214",
    amount: 2500,
    status: "Success",
    direction: "in",
  },
];

const columns = [
  {
    title: "Type",
    dataIndex: "type",
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
          <p className="text-gray-400  text-sm">{record.date}</p>
        </div>
      </div>
    ),
  },

  {
    title: "Trx ID",
    dataIndex: "id",
    render: (id) => (
      <span className="text-gray-600 dark:text-neutral-300">{id}</span>
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
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-700 dark:text-green-100 text-green-700">
        {status}
      </span>
    ),
  },
];

export default function TransactionHistory() {
  return (
    <Card className="  overflow-x-auto dark:border-neutral-900! shadow-sm border-0!">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-300">
          Transaction History
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
      </div>

      {/* Styled Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="rounded-xl  min-w-[700px] border! border-gray-200!  dark:border-neutral-950!"
        rowClassName={() =>
          " even:bg-gray-50  dark:even:bg-slate-950 rounded-xl!  "
        }
      />
    </Card>
  );
}
