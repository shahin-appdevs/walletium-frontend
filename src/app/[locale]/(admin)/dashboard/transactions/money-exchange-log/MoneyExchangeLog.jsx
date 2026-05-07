"use client";
import { Card, Modal } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import dayjs from "dayjs";
import { statusMap } from "@/utils/statusMap";
import { useTranslations } from "next-intl";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";
import SearchInput from "@/components/ui/SearchInput";
import useDebounceSearch from "@/hooks/useDebounceSearch";

export default function MoneyExchangeLog() {
  const t = useTranslations("Dashboard.exchangeMoney");
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { debouncedSearchTerm, handleSearch, searchTerm } =
    useDebounceSearch(1000);

  const {
    data: transactionsData,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery({
    type: "money-exchange",
    page: currentPage,
    per_page: pageSize,
    trx_id: debouncedSearchTerm,
  });

  const paginationInfo = transactionsData?.data?.transactions;

  const transactions = transactionsData?.data?.transactions?.data || [];

  const handleOnRowClick = (record) => {
    const labels = [
      t("transaction.type"),
      t("transaction.trxId"),
      t("transaction.exchangeAmount"),
      t("transaction.feeCharge"),
      t("summary.totalPayable"),
      t("transaction.convertedAmount"),
      t("transaction.exchangeRate"),
      t("transaction.date"),
      t("transaction.status"),
    ];
    const values = [
      "type",
      "trx_id",
      "request_amount",
      "total_charge",
      "total_payable",
      "receive_amount",
      "exchange_rate",
      "created_at",
      "status",
    ];

    const arr = labels.map((item, idx) => {
      let value = record[values[idx]];
      if (values[idx] === "type") {
        value = record?.type;
      }
      if (values[idx] === "created_at") {
        value = dayjs(value).format("DD MMM YYYY, hh:mm A");
      }
      if (values[idx] === "request_amount") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(4) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "total_charge") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(4) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "total_payable") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(4) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "receive_amount") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(4) || 0} ${record?.payment_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "exchange_rate") {
        value = (
          <span dir="ltr">
            {`1 ${record?.request_currency || ""} = ${
              record?.exchange_rate?.toFixed(4) || 0
            } ${record?.payment_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "status") {
        const label = statusMap[value]?.label;
        const className = statusMap[value]?.className;
        value =
          (label && className && (
            <span className={`${className} px-3 py-1 text-sm rounded-full`}>
              {label}
            </span>
          )) ||
          "Unknown";
      }
      return { label: item, value: value };
    });

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: <span className="whitespace-nowrap">{t("transaction.type")}</span>,
      dataIndex: "type",

      render: (type) => (
        <div className="flex items-center gap-3">
          <div className="w-10 shrink-0 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-300">
            <ArrowUpOutlined className="text-gray-500 text-lg rotate-45 rtl:-rotate-45" />
          </div>

          <div>
            <p className="font-medium text-sm! text-gray-800 dark:text-neutral-300">
              {type}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">
          {t("transaction.exchangeAmount")}
        </span>
      ),
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span className={`font-semibold  text-red-500 text-nowrap`} dir="ltr">
          -{amount?.toFixed(2)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">{t("transaction.trxId")}</span>
      ),
      dataIndex: "trx_id",
      render: (id) => (
        <span className="text-gray-600 dark:text-neutral-300">#{id}</span>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">
          {t("transaction.convertedAmount")}
        </span>
      ),
      dataIndex: "receive_amount",
      render: (amount, record) => (
        <span className="font-semibold text-green-500 text-nowrap" dir="ltr">
          +{amount?.toFixed(2)} {record?.payment_currency}
        </span>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">{t("summary.totalPayable")}</span>
      ),
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span
          className="font-semibold text-red-500 dark:text-neutral-300 text-nowrap"
          dir="ltr"
        >
          -{amount?.toFixed(2)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">{t("transaction.date")}</span>,
      dataIndex: "created_at",
      render: (date) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {dayjs(date).format("DD MMM YYYY")}
        </span>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">{t("transaction.feeCharge")}</span>
      ),
      dataIndex: "total_charge",
      render: (charge, record) => (
        <span className="text-red-500 text-nowrap" dir="ltr">
          -{charge?.toFixed(2)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: (
        <span className="whitespace-nowrap">{t("transaction.status")}</span>
      ),
      dataIndex: "status",
      render: (status) => {
        const current = statusMap[status] || {
          label: "Unknown",
          className: "bg-gray-100 text-gray-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm! ${current.className}`}
          >
            {current.label}
          </span>
        );
      },
    },
  ];

  const tableData = transactions?.map((item, idx) => ({
    ...item,
    key: idx,
  }));

  const smallScreenColumn = smallScreen ? columns.slice(0, 2) : columns;

  const TableExtra = (
    <SearchInput
      placeholder={t("transaction.searchPlaceholder")}
      isFetching={isFetching}
      value={searchTerm}
      onChange={(val) => {
        handleSearch(val);
        setCurrentPage(1);
      }}
    />
  );

  return (
    <Card title={t("transaction.title")} extra={TableExtra}>
      <Modal
        open={isModalOpen}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okText={t("transaction.close")}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg! font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("transaction.title")}
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

      <div className="overflow-x-auto">
        <Table
          columns={smallScreenColumn}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            current: paginationInfo?.current_page || 1,
            pageSize: paginationInfo?.per_page || 10,
            total: paginationInfo?.total || 0,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            showTotal: (total) => t(`transaction.totalPage`, { total }),
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            locale: {
              items_per_page: `/ ${t("transaction.perPage")}`,
            },
          }}
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
