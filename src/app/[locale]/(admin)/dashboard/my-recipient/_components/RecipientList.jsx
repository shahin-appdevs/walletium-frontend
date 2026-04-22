"use client";

import { Input, Card, Modal, Space, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Table from "@/components/ui/Table";
import useModal from "@/hooks/useModal";
import { useState, useMemo } from "react";
import useViewport from "@/hooks/useViewport";
import LucideIcon from "@/components/LucideIcon";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
import {
  useDeleteRecipientMutation,
  useGetMyRecipientsQuery,
} from "@/redux/api/myRecipientsApi";
import { useLocale } from "next-intl";
import RecipientListSkeleton from "./myRecipientSkeleton/RecipientListSkeleton";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import showToast from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function RecipientList() {
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [singleTable, setSingleTable] = useState([]);
  const { smallScreen } = useViewport();
  const locale = useLocale();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const router = useRouter();

  // ==================== API DATA ====================
  const {
    data: apiData,
    isLoading,
    isFetching,
  } = useGetMyRecipientsQuery({
    lang: locale,
  });

  const [deleteRecipient, { isLoading: isDeleting }] =
    useDeleteRecipientMutation();

  // Transform API response to match your Table structure
  const tableData = useMemo(() => {
    if (
      !apiData?.data?.receipients ||
      !Array.isArray(apiData.data.receipients)
    ) {
      return [];
    }

    return apiData.data.receipients.map((item) => ({
      key: item.id || item.receipient_id,
      name: `${item.firstname || ""} ${item.lastname || ""}`.trim(),
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      country: item.country || "",
      zip_code: item.zip_code || "",
      email: item.email || "",
      // Extra fields (kept for future use / modal)
      address: item.address || "",
      state: item.state || "",
      city: item.city || "",
      image: item.image || "",
      path_location: item.path_location || "",
      default_image: item.default_image || "",
    }));
  }, [apiData]);

  console.log(tableData);

  // ==================== Handlers (UNCHANGED) ====================
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
    sessionStorage.setItem("update_user", JSON.stringify(record));

    router.push(
      `/dashboard/my-recipient/add-new-recipient?update_user=${record.email}`,
    );
  };

  const handleDelete = async (record) => {
    try {
      const res = await deleteRecipient({
        target: record.key,
        lang: locale,
      }).unwrap();
      showToast.apiSuccess(res);
      setIsDeleteModalOpen(false);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  // ==================== Columns (UNCHANGED) ====================
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name, record) => (
        <div className="flex items-center gap-3">
          {/* Image added here */}

          <Image
            src={
              record.image
                ? getImageUrl(record.image, record.path_location)
                : getImageUrl(record.default_image)
            }
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover border border-gray-200 dark:border-gray-700 shrink-0"
          />
          <span className="text-gray-600 dark:text-neutral-300">{name}</span>
        </div>
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
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(record);
              setIsDeleteModalOpen(true);
            }}
            className="cursor-pointer text-red-500!"
          >
            <LucideIcon name="Trash2" size={20} />
          </button>
        </Space>
      ),
    },
  ];

  const smallScreenColumn = smallScreen ? [...columns.slice(0, 2)] : columns;

  // ==================== Extra Header (UNCHANGED) ====================
  const TableExtra = (
    <div className="flex items-center gap-2 md:gap-0 ">
      <div className="md:w-full hidden md:block">
        <Input
          placeholder="Search"
          size="large"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-48 rounded-lg"
        />
      </div>
      <div className="md:hidden">
        <PrimaryButton
          icon={"Search"}
          iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
        >
          <span className="hidden md:block"> Add New Recipient</span>
        </PrimaryButton>
      </div>
      <div className="md:w-full md:flex justify-end">
        <Link href="/dashboard/my-recipient/add-new-recipient">
          <PrimaryButton
            icon={"Plus"}
            iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
          >
            <span className="hidden md:block"> Add New Recipient</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );

  return (
    <Card
      title="Recipient List"
      extra={TableExtra}
      className="overflow-x-auto!"
    >
      {/* Modal (UNCHANGED) */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelText="Close"
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

      {/* Table with real data */}
      {isLoading ? (
        <RecipientListSkeleton />
      ) : (
        <Table
          columns={smallScreenColumn}
          isLoading={isLoading || isFetching}
          dataSource={tableData || []}
          pagination={{
            pageSize: 10,
            total: tableData.length,
            showTotal: (total) => `Total ${total} items`,
          }}
          rowKey="key"
          onRowClick={handleOnRowClick}
          className="rounded-xl border! border-gray-200/50! dark:border-neutral-950! md:min-w-[820px]! "
          rowClassName={() =>
            "even:bg-gray-50 dark:even:bg-slate-950 rounded-xl! cursor-pointer!"
          }
        />
      )}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(deleteTarget)}
        loading={isDeleting}
        title="Delete Recipient"
        description="Are you sure you want to delete this recipient?"
      />
    </Card>
  );
}
