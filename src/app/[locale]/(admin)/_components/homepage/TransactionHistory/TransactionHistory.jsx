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
import { useDashboardContext } from "@/contexts/DashboardProvider";
import dayjs from "dayjs";

// const data = [
//   {
//     key: "1",
//     transaction_type: "Receive Money",
//     transaction_id: "TXID123",
//     fee_charge: 20,
//     exchange_rate: "2%",
//     date: "07 Jun 2025",
//     id: "#MY548G214",
//     amount: 2500,
//     status: "Success",
//     direction: "in",
//   },
//   {
//     key: "2",
//     transaction_type: "Money Out",
//     transaction_id: "TXID123",
//     fee_charge: 20,
//     exchange_rate: "2%",
//     date: "07 Jun 2025",
//     id: "#MY548G214",
//     amount: -8600,
//     status: "Success",
//     direction: "out",
//   },
//   {
//     key: "3",
//     transaction_type: "Receive Money",
//     transaction_id: "TXID123",
//     fee_charge: 20,
//     exchange_rate: "2%",
//     date: "07 Jun 2025",
//     id: "#MY548G214",
//     amount: -6140,
//     status: "Success",
//     direction: "out",
//   },
//   {
//     key: "4",
//     transaction_type: "Receive Money",
//     transaction_id: "TXID123",
//     fee_charge: 20,
//     exchange_rate: "2%",
//     date: "07 Jun 2025",
//     id: "#MY548G214",
//     amount: 2500,
//     status: "Success",
//     direction: "in",
//   },
// ];

export default function TransactionHistory() {
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
      "Transaction Type",
      "TXID",
      "Date",
      "Amount",
      "Currency",
      "Status",
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
      if (item === "Status") {
        switch (record[values[idx]]) {
          case 1:
            return {
              label: item,
              value: <span className="text-green-500">Success</span>,
            };

          case 2:
            return {
              label: item,
              value: <span className="text-yellow-500">Pending</span>,
            };

          case 3:
            return {
              label: item,
              value: <span className="text-yellow-500">Hold</span>,
            };

          default:
            return {
              label: item,
              value: <span className="text-red-500">Rejected</span>,
            };
        }
      }

      if (item === "Date") {
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
      title: "Type",
      dataIndex: "type",
      width: 250,
      render: (type) => {
        const isIn = type === "DEPOSIT";

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-300">
              {isIn ? (
                <ArrowDownOutlined className="text-gray-500 rotate-45 text-lg" />
              ) : (
                <ArrowUpOutlined className="text-gray-500 rotate-45 text-lg" />
              )}
            </div>

            <div>
              <p className="font-medium text-gray-800 dark:text-neutral-300">
                {type}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      title: "Trx ID",
      dataIndex: "trx_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">{id}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {dayjs(date).format("DD MMM YYYY, hh:mm A")}
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "receive_amount",
      render: (amount, record) => {
        const isIn = record.type === "DEPOSIT";

        return <span className={`font-semibold`}>{amount?.toFixed(4)}</span>;
      },
    },

    {
      title: "Currency",
      dataIndex: "request_currency",
      render: (currency) => (
        <span className="text-gray-600 dark:text-neutral-300">{currency}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const statusMap = {
          1: {
            label: "Success",
            className:
              "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
          },
          2: {
            label: "Pending",
            className:
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
          },
          3: {
            label: "Hold",
            className:
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
          },
          4: {
            label: "Rejected",
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

  return (
    <Card className=" overflow-x-auto! dark:border-neutral-900! shadow-xs border-0!">
      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        onOk={handleCancelModal}
      >
        <h4 className=" font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Transaction History
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
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-4">
        <h4 className="font-bold text-neutral-800 dark:text-neutral-300">
          Transaction History
        </h4>

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
