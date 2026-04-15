"use client";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import useModal from "@/hooks/useModal";
import { Modal } from "antd";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EnableDisableModal({ status }) {
  const t = useTranslations("Dashboard.security.2fa");
  const { isModalOpen, handleCancelModal, handleShowModal } = useModal();
  const isEnabled = status === 0;
  const label = isEnabled ? t("enable") : t("disable");

  const handle2FactorAuth = async () => {
    // your logic here
    handleCancelModal();
  };

  return (
    <>
      <PrimaryButton onClick={handleShowModal} className="w-full">
        {label}
      </PrimaryButton>

      <Modal
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={false}
        closeIcon={false}
      >
        <div>
          <div className="mx-auto mb-4 flex h-20 w-20 border-red-500/50 border items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="text-red-500" size={50} />
          </div>

          <h2 className="text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("areYouSure")}
          </h2>

          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-200">
            {isEnabled ? t("confirmationToEnable") : t("confirmationToDisable")}
          </p>

          <div className="mt-6 flex gap-2">
            <button
              onClick={handle2FactorAuth}
              className="w-full py-2 bg-red-500! duration-300 rounded-lg text-white hover:bg-red-600! cursor-pointer"
            >
              {label}
            </button>
            <button
              onClick={handleCancelModal}
              className="w-full rounded-lg border border-gray-200 py-2 duration-300 text-sm font-medium text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-600 cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
