"use client";
import { Card, Modal, Tooltip, Button } from "antd";
import { ArrowUpOutlined, CopyOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import useViewport from "@/hooks/useViewport";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import dayjs from "dayjs";
import { statusMap } from "@/utils/statusMap";
import { useRouter } from "next/navigation";
import { useGetVoucherMoneyTrxQuery } from "@/redux/api/transactionsApi";
import { useMyVoucherCancelMutation } from "@/redux/api/myVoucherApi";
import showToast from "@/lib/toast";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import { useTranslations } from "next-intl";

export default function MyVoucherTransaction() {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [singleTable, setSingleTable] = useState([]);
  const [cancelCode, setCancelCode] = useState(null);
  const { smallScreen } = useViewport();
  const router = useRouter();
  const t = useTranslations("Dashboard.myVoucher.transactions");

  const { data: transactionsData, isLoading } = useGetVoucherMoneyTrxQuery({
    page: 1,
    per_page: 5,
  });

  const [myVoucherCancel, { isLoading: isCancelling }] =
    useMyVoucherCancelMutation();

  const transactions = transactionsData?.transactions?.data || [];

  const handleCancelVoucher = async () => {
    if (!cancelCode) return;
    try {
      const res = await myVoucherCancel({ code: cancelCode }).unwrap();
      showToast.apiSuccess(res);
      setCancelCode(null);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const handleOnRowClick = (record) => {
    const labels = [
      t("redeemCode"),
      t("paidBy"),
      t("requestAmount"),
      t("feeCharge"),
      t("totalPayable"),
      t("date"),
      t("status"),
    ];
    const values = [
      "code",
      "paid_by",
      "request_amount",
      "total_charge",
      "total_payable",
      "created_at",
      "status",
    ];

    const arr = labels.map((item, idx) => {
      let value = record[values[idx]];
      if (values[idx] === "code") {
        value = (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">{record?.code || "N/A"}</span>
            {record?.code !== "N/A" && (
              <Tooltip title={t("copyCode")}>
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined className="text-primary" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(record?.code);
                    showToast.success(t("codeCopied"));
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      }
      if (values[idx] === "paid_by") {
        value = <span dir="ltr">{record?.paid_by || t("notAvailable")}</span>;
      }
      if (values[idx] === "created_at") {
        value = dayjs(value).format("DD MMM YYYY, hh:mm A");
      }
      if (values[idx] === "request_amount") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(2) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }

      if (values[idx] === "total_charge") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(2) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "total_payable") {
        value = (
          <span dir="ltr">
            {`${value?.toFixed(2) || 0} ${record?.request_currency || ""}`}
          </span>
        );
      }
      if (values[idx] === "details") {
        const redeemCode =
          record?.details?.code || record?.details?.redeem_code || "N/A";
        value = (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">{redeemCode}</span>
            {redeemCode !== "N/A" && (
              <Tooltip title={t("copyCode")}>
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined className="text-primary" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(redeemCode);
                    showToast.success(t("codeCopied"));
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      }
      if (values[idx] === "status") {
        const label =
          statusMap[value]?.label === "Rejected"
            ? t("canceled")
            : statusMap[value]?.label;
        const className = statusMap[value]?.className;
        value =
          (label && className && (
            <span
              className={`${className} px-3 py-1 text-sm rounded-full font-normal!`}
            >
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
      title: t("redeemCode"),
      dataIndex: "code",
      width: 200,
      render: (code) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-500">
            <ArrowUpOutlined className="text-gray-500 text-lg rotate-45 rtl:-rotate-45" />
          </div>

          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-800 dark:text-neutral-300">
              {code}
            </p>
            <Tooltip title={t("copyCode")}>
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined className="text-primary" />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(code);
                  showToast.success(t("codeCopied"));
                }}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: t("amount"),
      dataIndex: "request_amount",
      render: (amount, record) => (
        <span className="font-semibold text-green-500 text-nowrap" dir="ltr">
          +{amount?.toFixed(2)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: t("paidBy"),
      dataIndex: "paid_by",
      render: (paidBy, record) => (
        <span className="text-gray-600 dark:text-neutral-300">
          {paidBy ?? (
            <span className="text-red-500 dark:text-red-300">
              {t("notAvailable")}
            </span>
          )}
        </span>
      ),
    },
    {
      title: t("totalPayable"),
      dataIndex: "total_payable",
      render: (amount, record) => (
        <span
          className="font-semibold text-red-500 dark:text-red-500 text-nowrap"
          dir="ltr"
        >
          -{amount?.toFixed(2)} {record?.request_currency}
        </span>
      ),
    },
    {
      title: t("feeCharge"),
      dataIndex: "total_charge",
      render: (charge, record) => (
        <span className="text-red-500 text-nowrap" dir="ltr">
          -{charge?.toFixed(2)} {record?.request_currency}
        </span>
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
      title: t("status"),
      dataIndex: "status",
      render: (status) => {
        const current = statusMap[status] || {
          label: "Unknown",
          className: "bg-gray-100 text-gray-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm ${current.className}`}
          >
            {current.label === "Rejected" ? t("canceled") : current.label}
          </span>
        );
      },
    },
    {
      title: t("action"),
      dataIndex: "details",
      render: (details, record) => {
        // Only show cancel for pending/waiting vouchers (status 2 or 5)

        if (record.status !== 2)
          return (
            <button
              disabled
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1  w-full rounded-full text-sm text-nowrap bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              {t("inactive")}
            </button>
          );
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCancelCode(record.code);
            }}
            className="px-3 py-1 w-full rounded-full text-nowrap text-sm bg-red-500 text-white font-medium dark:bg-red-600 dark:text-white-500 hover:bg-red-600 dark:hover:bg-red-700 transition-colors cursor-pointer"
          >
            {t("cancel")}
          </button>
        );
      },
    },
  ];

  const tableData = transactions?.map((item, idx) => ({
    ...item,
    key: idx,
  }));

  const smallScreenColumn = smallScreen
    ? columns.slice(0, 2).concat(columns.slice(-1))
    : columns;

  const TableExtra = (
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className=" md:flex justify-end ">
        <PrimaryButton
          onClick={() => router.push("/dashboard/transactions/voucher-log")}
          icon="ArrowUpRight"
          iconClassName={
            "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
          }
        >
          <span className="hidden md:block">{t("viewMore")}</span>
        </PrimaryButton>
      </div>
    </div>
  );

  return (
    <Card title={t("title")} extra={TableExtra}>
      <Modal
        open={isModalOpen}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okText={t("close")}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-[#111] shadow-xs border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg! font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("transactionDetails")}
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

      <ConfirmationModal
        open={!!cancelCode}
        onCancel={() => setCancelCode(null)}
        onConfirm={handleCancelVoucher}
        loading={isCancelling}
        message={t("cancelMessage")}
        confirmBtn={t("cancelConfirm")}
        cancelBtn={t("cancelDeny")}
      />

      <div className="overflow-x-auto">
        <Table
          columns={smallScreenColumn}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
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
