"use client";
import { Input, Card, Modal } from "antd";
import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { statusMap } from "@/utils/statusMap";
import { useTranslations } from "next-intl";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";

const AddMoneyLog = () => {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();
  const t = useTranslations("Dashboard.addMoney.transaction");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: transactionsData, isLoading } = useGetTransactionsQuery({
    type: "add-money",
    page: currentPage,
    per_page: pageSize,
  });

  const transactions = transactionsData?.data?.transactions?.data;
  const paginationInfo = transactionsData?.data?.transactions;

  const handleOnRowClick = (record) => {
    const arr = [
      { label: t("type"), value: record.type },
      { label: t("gatewayCurrency"), value: record.gateway_currency },
      { label: t("trxId"), value: `#${record.trx_id}` },
      {
        label: t("amount"),
        value: `${Number(record.request_amount || 0).toFixed(2)} ${
          record.request_currency
        }`,
      },
      {
        label: t("feeCharge"),
        value: `${Number(record.total_charge || 0).toFixed(2)} ${
          record.request_currency
        }`,
      },
      {
        label: t("totalPayable"),
        value: `${Number(record.total_payable || 0).toFixed(2)} ${
          record.request_currency
        }`,
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
        value: (
          <span
            className={`${statusMap[record.status]?.className} px-3 py-1 text-sm rounded-full font-normal!`}
          >
            {statusMap[record.status]?.label || "Unknown"}
          </span>
        ),
        bold: true,
      },
    ];

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: t("type"),
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
      title: t("amount"),
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span className="font-semibold text-green-600 whitespace-nowrap">
          + {Number(amount).toFixed(2)} {record.request_currency}
        </span>
      ),
    },
    {
      title: t("trxId"),
      dataIndex: "trx_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">#{id}</span>
      ),
    },
    {
      title: t("totalPayable"),
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span className="font-semibold text-red-500 dark:text-red-800">
          {Number(amount).toFixed(2)} {record.request_currency}
        </span>
      ),
    },

    {
      title: t("date"),
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
      title: t("exchangeRate"),
      dataIndex: "exchange_rate",
      render: (rate, record) => (
        <span className="text-gray-600 dark:text-neutral-300 whitespace-nowrap">
          1 {record.request_currency} = {rate} {record.payment_currency}
        </span>
      ),
    },
    {
      title: t("feeCharge"),
      dataIndex: "total_charge",
      render: (charge, record) => (
        <span className="text-red-500">
          {Number(charge || 0).toFixed(2)} {record.request_currency}
        </span>
      ),
    },
    {
      title: t("status.title"),
      dataIndex: "status",
      render: (status) => {
        const mapped = statusMap[status] || { label: "Unknown", className: "" };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${mapped.className}`}
          >
            {mapped.label}
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
          placeholder={t("searchPlaceholder")}
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
    </div>
  );

  return (
    <Card title={t("title")} extra={TableExtra}>
      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        closable={false}
        okText={t("close")}
        onOk={handleCancelModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg! font-semibold text-gray-900 dark:text-gray-100 mb-4">
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
      <div className="overflow-x-auto!">
        <Table
          columns={smallScreenColumn}
          dataSource={transactions}
          loading={isLoading}
          pagination={{
            current: paginationInfo?.current_page || 1,
            pageSize: paginationInfo?.per_page || 10,
            total: paginationInfo?.total || 0,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            showTotal: (total) => t(`totalPage`, { total }),
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            locale: {
              items_per_page: `/ ${t("perPage")}`,
            },
          }}
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
};

export default AddMoneyLog;
