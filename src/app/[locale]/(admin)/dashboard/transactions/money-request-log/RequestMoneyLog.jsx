"use client";
import { Card, Modal, Tooltip, Button, Input } from "antd";
import {
  ArrowDownOutlined,
  CopyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useLocale, useTranslations } from "next-intl";
import showToast from "@/lib/toast";
import { statusMap } from "@/utils/statusMap";
import { useGetRequestMoneyTrxQuery } from "@/redux/api/transactionsApi";

export default function RequestMoneyLog({}) {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();
  const locale = useLocale();
  const t = useTranslations("Dashboard.requestMoney.transactions");
  const tc = useTranslations("common");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // trx api
  const { data: transactionsData, isLoading } = useGetRequestMoneyTrxQuery({
    page: currentPage,
    per_page: pageSize,
  });

  const paginationInfo = transactionsData?.transactions;
  const transactions = transactionsData?.transactions?.data || [];

  const handleOnRowClick = (record) => {
    const shareLink = `${window.location.origin}/${locale}/dashboard/request-money/share?token=${record.identifier}`;
    const labels = [
      t("type"),
      t("link"),
      t("createdBy"),
      t("trxId"),
      t("amount"),
      t("feeCharge"),
      t("totalPayable"),
      t("exchangeRate"),
      t("remarks"),
      t("status.title"),
    ];

    const values = [
      t("requestMoneyTitle") || "Request Money",
      <div key={1} className="flex items-center gap-2">
        <span className="max-w-[200px] truncate">{shareLink}</span>
        <Tooltip title={t("copyLink") || "Copy Link"}>
          <CopyOutlined
            className="cursor-pointer text-primary"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              showToast.success(t("copySuccess") || "Link copied!");
            }}
          />
        </Tooltip>
      </div>,
      record.created_by,
      record.identifier,
      `${record.request_amount} ${record.request_currency}`,
      `${record.total_charge} ${record.request_currency}`,
      `${record.total_payable} ${record.request_currency}`,
      `1 ${record.request_currency} = 1 ${record.request_currency}`,
      record.remark || "N/A",
      (
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusMap[record.status]?.className || "bg-gray-100 text-gray-700"
          }`}
        >
          {statusMap[record.status]?.label}
        </div>
      ) || "Unknown",
    ];

    const arr = labels.map((item, idx) => {
      return { label: item, value: values[idx] };
    });

    setSingleTable(arr);
    handleShowModal();
  };

  const columns = [
    {
      title: t("type"),
      dataIndex: "transaction_type",
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
              {t("requestMoneyTitle") || "Request Money"}
            </p>
            <p className="text-gray-400  text-sm">
              {t("receiveMoney") || "Receive Money"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t("link"),
      dataIndex: "identifier",
      render: (identifier) => {
        const shareLink = `${window.location.origin}/${locale}/dashboard/request-money/share?token=${identifier}`;
        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-neutral-300">
              {shareLink.slice(0, 20)}...
            </span>
            <Tooltip title={t("copyLink") || "Copy Link"}>
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined className="text-primary" />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(shareLink);
                  showToast.success(t("copySuccess") || "Link copied!");
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: t("amount"),
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span
          dir="ltr"
          className="font-semibold text-green-600 whitespace-nowrap"
        >
          +{amount.toLocaleString()} {record.request_currency}
        </span>
      ),
    },

    {
      title: t("totalPayable"),
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span
          dir="ltr"
          className="font-semibold text-red-500 whitespace-nowrap"
        >
          -{amount.toLocaleString()} {record.request_currency}
        </span>
      ),
    },

    {
      title: t("createdBy"),
      dataIndex: "created_by",
      render: (createdBy) => (
        <span className="text-gray-600 dark:text-neutral-300">{createdBy}</span>
      ),
    },

    {
      title: t("exchangeRate"),
      dataIndex: "exchange_rate",
      render: (exchange_rate, record) => {
        return (
          <span
            dir="ltr"
            className="text-gray-600 dark:text-neutral-300 whitespace-nowrap"
          >
            1 {record.request_currency} = 1 {record.request_currency}
          </span>
        );
      },
    },
    {
      title: t("feeCharge"),
      dataIndex: "total_charge",
      render: (total_charge, record) => (
        <span dir="ltr" className="text-red-500 dark:text-neutral-300">
          {total_charge} {record.request_currency}
        </span>
      ),
    },
    {
      title: t("status.title"),
      dataIndex: "status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusMap[status]?.className || "bg-gray-100 text-gray-700"
          }`}
        >
          {statusMap[status]?.label || "Unknown"}
        </span>
      ),
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;

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
        cancelText={tc("action.close") || "Close"}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg! font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("title")}
          </h2>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {singleTable?.map((row, idx) => (
              <div
                key={idx}
                className="flex justify-between gap-4 items-center py-3 text-sm"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {row.label}
                </span>

                <span
                  dir="ltr"
                  className={`text-gray-900 dark:text-gray-100 overflow-x-auto! ${
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
      {console.log(paginationInfo)}
      {/* Styled Table */}
      <div className="overflow-x-auto!">
        <Table
          columns={smallScreenColumn}
          dataSource={transactions}
          onRowClick={handleOnRowClick}
          className="rounded-xl  border! border-gray-200/50! dark:border-neutral-950! md:min-w-[820px]! "
          rowClassName={() =>
            "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
          }
          rowKey="id"
          pagination={{
            current: paginationInfo?.current_page || currentPage,
            pageSize: paginationInfo?.per_page || pageSize,
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
          loading={isLoading}
        />
      </div>
    </Card>
  );
}
