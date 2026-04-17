import { useState, useEffect } from "react";

export const useResendOtpTimer = (initialTime = 59) => {
  const [resendOtpTimer, setResendOtpTimer] = useState(initialTime);

  useEffect(() => {
    if (resendOtpTimer <= 0) return;

    const intervalId = setInterval(() => {
      setResendOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resendOtpTimer]);

  const resetTimer = () => {
    setResendOtpTimer(initialTime);
  };

  return {
    resendOtpTimer,
    canResend: resendOtpTimer <= 0,
    resetTimer,
  };
};
