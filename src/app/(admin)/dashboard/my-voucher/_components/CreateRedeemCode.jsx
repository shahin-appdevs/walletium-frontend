import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import showToast from "@/lib/toast";
import { Input, Modal } from "antd";
import React from "react";
import { Slide, toast } from "react-toastify";

const CreateRedeemCode = ({
  isModalOpen,
  handleCancelModal,
  handleOkModal,
}) => {
  const copyToClipboard = async (text) => {
    try {
      navigator.clipboard.writeText(text);
      // toast.success("Copied Successfully", {
      //   position: "top-center",
      //   hideProgressBar: true,
      //   autoClose: 2000,
      //   transition: Slide,
      // });
      showToast.success("Copied Successfully");
    } catch (err) {
      console.error("Field to copy", err);
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
        okText={"Done"}
      >
        <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-slate-900 shadow-xs border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Redeem Code
          </h2>

          <div className="flex gap-2 items-center">
            <div className="w-full relative">
              <Input placeholder="Redeem Code" size="large" type="text" />
            </div>

            <PrimaryButton
              onClick={() => copyToClipboard("Something")}
              className={"text-base shrink-0"}
              iconClassName={
                "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
              }
            >
              Copy
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRedeemCode;
