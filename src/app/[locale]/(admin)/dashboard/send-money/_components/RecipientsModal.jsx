"use client";
import { Modal, Input, Empty, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import LucideIcon from "@/components/LucideIcon";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useGetMyRecipientsQuery } from "@/redux/api/myRecipientsApi";
import { getImageUrl } from "@/utils/getImageUrl";

const RecipientsModal = ({
  open,
  onCancel,
  onConfirm,
  onConfirmSend,
  loading,
  confirmDetails,
  confirmLoading,
}) => {
  const locale = useLocale();
  const [searchText, setSearchText] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  // Fetch recipients list
  const { data: apiData, isLoading: isRecipientsLoading } =
    useGetMyRecipientsQuery({
      lang: locale,
    });

  // Transform API response
  const recipients = useMemo(() => {
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
      email: item.email || "",
      country: item.country || "",
      city: item.city || "",
      state: item.state || "",
      zip_code: item.zip_code || "",
      address: item.address || "",
      image: item.image || "",
      path_location: item.path_location || "",
      default_image: item.default_image || "",
    }));
  }, [apiData]);

  // Filter recipients by search text
  const filteredRecipients = useMemo(() => {
    if (!searchText.trim()) return recipients;

    const lowerSearch = searchText.toLowerCase();
    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(lowerSearch) ||
        r.email.toLowerCase().includes(lowerSearch) ||
        r.country.toLowerCase().includes(lowerSearch),
    );
  }, [recipients, searchText]);

  const handleSelect = (recipient) => {
    setSelectedRecipient(
      selectedRecipient?.key === recipient.key ? null : recipient,
    );
  };

  const handleConfirm = () => {
    if (selectedRecipient && onConfirm) {
      onConfirm(selectedRecipient);
    }
  };

  const handleCancel = () => {
    setSelectedRecipient(null);
    setSearchText("");
    onCancel();
  };

  // Build preview table from confirmDetails
  const confirmData = confirmDetails?.confirm_details;
  const previewTable = confirmData
    ? [
        {
          label: "Sending Amount",
          value: `${confirmData.sender_amount} ${confirmData.sender_currency}`,
        },
        {
          label: "Exchange Rate",
          value: `1 ${confirmData.sender_currency} = ${confirmData.exchange_rate.toFixed(4)} ${confirmData.receiver_currency}`,
        },
        {
          label: "Receiver Will Get",
          value: `${(confirmData.will_get * confirmData.exchange_rate).toFixed(4)} ${confirmData.receiver_currency}`,
        },
        {
          label: "Total Charge",
          value: `${confirmData.total_charge.toFixed(4)} ${confirmData.sender_currency}`,
        },
        {
          label: "Total Payable Amount",
          value: `${confirmData.total_payable.toFixed(4)} ${confirmData.sender_currency}`,
          bold: true,
        },
      ]
    : [];

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
            <LucideIcon
              name={confirmDetails ? "Eye" : "Users"}
              size={16}
              className="text-primary dark:text-primary-50!"
            />
          </div>
          <span>
            {confirmDetails ? "Send Money Preview" : "Select Recipient"}
          </span>
        </div>
      }
      width={560}
      centered
    >
      {confirmDetails ? (
        /* ==================== Preview View ==================== */
        <div className="space-y-4">
          {/* Preview Summary Table */}
          <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 dark-border shadow-xs">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {previewTable.map((row, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 text-sm"
                >
                  <span
                    className={`text-gray-600 font-medium dark:text-gray-400 ${
                      row.bold ? "font-bold text-base lg:text-lg" : ""
                    }`}
                  >
                    {row.label}
                  </span>
                  <span
                    className={`text-gray-900 dark:text-gray-100 ${
                      row.bold
                        ? "font-bold text-base lg:text-lg"
                        : "font-medium"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Send Button */}
          <PrimaryButton
            icon="Send"
            type="button"
            className="text-base w-full"
            iconClassName="group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
            onClick={() => onConfirmSend?.(confirmDetails)}
            loading={confirmLoading}
          >
            Confirm Send Money
          </PrimaryButton>
        </div>
      ) : (
        /* ==================== Recipient Selection View ==================== */
        <div className="space-y-4">
          {/* Search Input */}
          <div className="mt-2">
            <Input
              size="large"
              placeholder="Search by name, email or country..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-xl"
              allowClear
            />
          </div>

          {/* Recipients List */}
          <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {isRecipientsLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-slate-900"
                  >
                    <Skeleton.Avatar active size={44} />
                    <div className="flex-1">
                      <Skeleton.Input
                        active
                        size="small"
                        className="w-32! mb-1"
                      />
                      <Skeleton.Input active size="small" className="w-48!" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRecipients.length === 0 ? (
              <Empty
                description={
                  searchText
                    ? "No recipients match your search"
                    : "No recipients found"
                }
                className="py-8"
              />
            ) : (
              filteredRecipients.map((recipient) => {
                const isSelected = selectedRecipient?.key === recipient.key;
                return (
                  <div
                    key={recipient.key}
                    onClick={() => handleSelect(recipient)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border
                      ${
                        isSelected
                          ? "border-primary bg-primary-50! dark:bg-primary-950! ring-1 ring-primary/30"
                          : "border-gray-200 dark:border-gray-800 bg-neutral-50 dark:bg-slate-900 hover:border-primary/50 hover:bg-primary-50/50 dark:hover:bg-primary-950/50"
                      }
                    `}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <Image
                        src={
                          recipient.image
                            ? getImageUrl(
                                recipient.image,
                                recipient.path_location,
                              )
                            : getImageUrl(recipient.default_image)
                        }
                        alt={recipient.name}
                        width={44}
                        height={44}
                        className="rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
                          <LucideIcon
                            name="Check"
                            size={12}
                            className="text-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">
                        {recipient.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {recipient.email}
                      </p>
                    </div>

                    {/* Country Badge */}
                    <div className="shrink-0 hidden sm:block">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                        {recipient.country}
                      </span>
                    </div>

                    {/* Selection indicator */}
                    <div className="shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                        ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 dark:border-gray-600"
                        }
                      `}
                      >
                        {isSelected && (
                          <LucideIcon
                            name="Check"
                            size={12}
                            className="text-white"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Selected Recipient Summary */}
          {selectedRecipient && (
            <div className="rounded-xl bg-neutral-50 dark:bg-slate-900 dark-border p-3 shadow-xs">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                Selected Recipient
              </p>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  { label: "Name", value: selectedRecipient.name },
                  { label: "Email", value: selectedRecipient.email },
                  { label: "Country", value: selectedRecipient.country },
                  {
                    label: "Address",
                    value: [
                      selectedRecipient.address,
                      selectedRecipient.city,
                      selectedRecipient.state,
                    ]
                      .filter(Boolean)
                      .join(", "),
                  },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 text-sm"
                  >
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {row.label}
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium text-right max-w-[60%] truncate">
                      {row.value || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <PrimaryButton
            icon="Send"
            type="button"
            className="text-base w-full"
            iconClassName="group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
            onClick={handleConfirm}
            loading={loading}
            disabled={!selectedRecipient}
          >
            Confirm & Send Money
          </PrimaryButton>
        </div>
      )}
    </Modal>
  );
};

export default RecipientsModal;
