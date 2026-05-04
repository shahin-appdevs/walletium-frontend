import { Modal } from "antd";
import { CheckCircle } from "lucide-react";
import React from "react";

const TrxSuccessModal = ({
  open,
  onClose,
  title = "Transaction Successful",
  message = "Your transaction has been completed successfully.",
  buttonTxt = "Done",
  ...props
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      closeIcon={false}
      {...props}
      centered
    >
      <div>
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-20 w-20 border border-green-500/50 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="text-green-500" size={50} />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-neutral-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-center text-sm text-gray-500">{message}</p>

        {/* Action */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 bg-green-500 duration-300 rounded-lg text-white hover:bg-green-600 cursor-pointer"
          >
            {buttonTxt}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TrxSuccessModal;

/**
 * Usage:
 * 
const [successModal, setSuccessModal] = useState({
  open: false,
  title: "",
  message: "",
  buttonTxt: "",
});

// After API success
setSuccessModal({
  open: true,
  title: "Money Exchanged!",
  message: "You have successfully exchanged 100 USD to 110 EUR.",
  buttonTxt: "Back to Dashboard",
});

// In JSX
<TrxSuccessModal
  open={successModal.open}
  title={successModal.title}
  message={successModal.message}
  buttonTxt={successModal.buttonTxt}
  onClose={() => setSuccessModal({ open: false })}
/>
 */
