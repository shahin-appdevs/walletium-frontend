"use client";
import { Input, Button, Card, Modal, Space } from "antd";
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
import LucideIcon from "@/components/LucideIcon";

export const data = [
  {
    key: "1",
    name: "John Doe",
    country: "United States",
    zip_code: "10001",
    email: "john.doe@example.com",
    fee_charge: "$12.50",
  },
  {
    key: "2",
    name: "Ayesha Rahman",
    country: "Bangladesh",
    zip_code: "1207",
    email: "ayesha.rahman@gmail.com",
    fee_charge: "৳150.00",
  },
  {
    key: "3",
    name: "Ravi Kumar",
    country: "India",
    zip_code: "560001",
    email: "ravi.kumar@outlook.com",
    fee_charge: "₹99.00",
  },
  {
    key: "4",
    name: "Sarah Williams",
    country: "United Kingdom",
    zip_code: "SW1A 1AA",
    email: "sarah.williams@yahoo.com",
    fee_charge: "£8.75",
  },
  {
    key: "5",
    name: "Ali Hassan",
    country: "Pakistan",
    zip_code: "44000",
    email: "ali.hassan@mail.com",
    fee_charge: "₨250.00",
  },
];

export default function RecipientList() {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen, mediumScreen } = useViewport();

  const handleOnRowClick = (record) => {
    const labels = ["Name", "Country", "Zip Code", "Email"];
    const values = ["name", "country", "zip_code", "email"];

    const arr = labels.map((item, idx) => {
      return { label: item, value: record[values[idx]] };
    });

    setSingleTable(arr);
    handleShowModal();
  };

  const handleEdit = (record, e) => {
    e.stopPropagation();

    console.log(record);
  };

  const handleDelete = (record, e) => {
    e.stopPropagation();

    console.log(record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => (
        <span className="text-gray-600 dark:text-neutral-300">{name}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (country) => (
        <span className="text-gray-600 dark:text-neutral-300">{country}</span>
      ),
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      render: (zip_code) => (
        <span className="text-gray-600 dark:text-neutral-300">{zip_code}</span>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      render: (email) => (
        <span className="px-3 py-1 rounded-full text-sm ">{email}</span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={(e) => handleEdit(record, e)}
            className="cursor-pointer text-primary-500!"
          >
            <LucideIcon name={"SquarePen"} size={20} />
          </button>
          <button
            onClick={(e) => handleDelete(record, e)}
            className="cursor-pointer text-red-500!"
          >
            <LucideIcon name="Trash2" size={20} />
          </button>
        </Space>
      ),
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;
  // const mediumScreenColumn = mediumScreen ? [...columns.slice(0, 4)] : columns;

  const TableExtra = (
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
    <Card
      title="Latest Transaction"
      extra={TableExtra}
      className="overflow-x-auto!"
    >
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
