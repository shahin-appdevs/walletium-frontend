import { Modal } from "antd";
import { AlertTriangle } from "lucide-react";
import React from "react";

const ConfirmationModal = ({
  message,
  confirmBtn = "Confirm",
  cancelBtn = "Cancel",
  open,
  onCancel,
  onConfirm,
  ...props
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={false}
      closeIcon={false}
      {...props}
      centered
    >
      <div>
        <div className="mx-auto mb-4 flex h-20 w-20 border-red-500/50 border items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="text-red-500" size={50} />
        </div>

        <h2 className="text-center text-lg font-semibold text-neutral-900 ">
          Are you sure?
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">{message}</p>

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={onConfirm}
            className="w-full  py-2 bg-red-500! duration-300 rounded-lg text-white hover:bg-red-600! cursor-pointer "
          >
            {confirmBtn}
          </button>

          <button
            onClick={onCancel}
            className="w-full rounded-lg border border-gray-200 py-2  duration-300 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            {cancelBtn}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
