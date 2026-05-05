"use client";
import { Card, Input, Modal } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import dayjs from "dayjs";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useTranslations } from "next-intl";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";
import { statusMap } from "@/utils/statusMap";

export default function TransactionHistory() {
  const t = useTranslations("Dashboard.transactions.allTransactions");
  const tc = useTranslations("common");
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();
  const { data: transactionsData, isLoading } = useGetTransactionsQuery({
    type: "",
    page: currentPage,
    per_page: pageSize,
  });

  const transactions = transactionsData?.data?.transactions?.data;
  const paginationInfo = transactionsData?.data?.transactions;

  const handleOnRowClick = (record) => {
    const labels = [
      t("type"),
      t("trxId"),
      t("date"),
      t("amount"),
      t("currency"),
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
      title: t("type"),
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
      title: t("trxId"),
      dataIndex: "trx_id",
      render: (id) => (
        <span
          dir="ltr"
          className="text-gray-600 dark:text-neutral-300"
        >{`#${id}`}</span>
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
      title: t("amount"),
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
      title: t("currency"),
      dataIndex: "request_currency",
      render: (currency) => (
        <span className="text-gray-600 dark:text-neutral-300">{currency}</span>
      ),
    },
    {
      title: t("status.title"),
      dataIndex: "status",
      render: (status) => {
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
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className="hidden md:block">
        <Input
          placeholder={t("transaction.searchPlaceholder")}
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
    <Card
      title={<h5>{t("title")}</h5>}
      extra={TableExtra}
      className=" overflow-x-auto! dark:border-neutral-900! shadow-xs border-0!"
    >
      <Modal
        open={isModalOpen}
        onOk={handleCancelModal}
        okText={tc("action.close")}
        onCancel={handleCancelModal}
        cancelButtonProps={{ style: { display: "none" } }}
        closeIcon={false}
      >
        <h4 className=" font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t("title")}
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
        rowKey="id"
        onRowClick={handleOnRowClick}
        className="rounded-xl  border! border-gray-200! dark:border-neutral-950! md:min-w-[820px]! "
        rowClassName={() =>
          "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
        }
      />
    </Card>
  );
}
