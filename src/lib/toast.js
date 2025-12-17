import { Bounce, toast } from "react-toastify";

const baseConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Bounce,
};

const showToast = {
  success: (msg, options = {}) =>
    toast.success(msg, { ...baseConfig, ...options }),
  error: (msg, options = {}) => toast.error(msg, { ...baseConfig, ...options }),
  info: (msg, options = {}) => toast.info(msg, { ...baseConfig, ...options }),
  warning: (msg, options = {}) =>
    toast.warning(msg, { ...baseConfig, ...options }),
};

export default showToast;
