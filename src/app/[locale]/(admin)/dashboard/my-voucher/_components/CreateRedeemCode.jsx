import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import showToast from "@/lib/toast";
import { Input, Modal } from "antd";
import React from "react";
import { useTranslations } from "next-intl";

const CreateRedeemCode = ({
  isModalOpen,
  handleCancelModal,
  handleOkModal,
  generatedCode = "",
}) => {
  const t = useTranslations("Dashboard.myVoucher.modal");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast.success(t("copySuccess"));
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={handleOkModal}
        closeIcon={false}
        onCancel={handleCancelModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okText={t("done")}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-slate-900 shadow-xs border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("title")}
          </h2>

          <div className="flex gap-2 items-center">
            <div className="w-full relative">
              <Input
                value={generatedCode}
                placeholder={t("title")}
                size="large"
                type="text"
                readOnly
              />
            </div>

            <PrimaryButton
              onClick={() => copyToClipboard(generatedCode)}
              className={"text-base shrink-0"}
              iconClassName={
                "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
              }
            >
              {t("copy")}
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRedeemCode;
