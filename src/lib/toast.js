import { Bounce, toast } from "react-toastify";

const baseConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Bounce,
  closeButton: ({ closeToast }) => (
    <button
      onClick={closeToast}
      className={`absolute top-3 text-lg! text-gray-400! dark:text-gray-600! hover:text-gray-600! transition-colors p-1 rounded-full rtl:left-3 ltr:right-3`}
      aria-label="Close"
    >
      ×
    </button>
  ),
  // Important: Make toast body relative so absolute positioning works
  style: {
    borderRadius: "12px",
    padding: "16px 20px",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    position: "relative", // ← Required for absolute close button
    minWidth: "280px",
  },

  // Optional: Better body class for more control
  bodyClassName: "flex items-center gap-3",
};

const showToast = {
  success: (msg, options = {}) =>
    toast.success(msg, { ...baseConfig, ...options }),
  error: (msg, options = {}) => toast.error(msg, { ...baseConfig, ...options }),
  info: (msg, options = {}) => toast.info(msg, { ...baseConfig, ...options }),
  warning: (msg, options = {}) =>
    toast.warning(msg, { ...baseConfig, ...options }),

  // pass the whole err object
  apiError: (err, fallback = "Something went wrong") => {
    const message =
      err?.data?.message?.error?.[0] ||
      err?.data?.message ||
      err?.data?.error ||
      err?.message ||
      fallback;

    toast.error(message, { ...baseConfig });
  },
};

export default showToast;
