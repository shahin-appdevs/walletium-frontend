// hooks/useGatewayLimits.js

import showToast from "@/lib/toast";
import { useMemo } from "react";

const FALLBACK = Object.freeze({ minLimit: 0, maxLimit: 0, isValid: false });

const useGatewayLimits = (selectedGateway, exchangeRate) => {
  return useMemo(() => {
    const toSafeNumber = (value) => {
      const num = Number(value);
      return Number.isFinite(num) && num >= 0 ? num : null;
    };

    const rate = toSafeNumber(exchangeRate);
    if (!selectedGateway || !rate) return FALLBACK;

    const min = toSafeNumber(selectedGateway.min_limit);
    const max = toSafeNumber(selectedGateway.max_limit);

    if (min === null || max === null) return FALLBACK;

    if (min > max) {
      showToast.error("min_limit exceeds max_limit");
      return FALLBACK;
    }

    const minLimit = parseFloat((min / rate).toFixed(2));
    const maxLimit = parseFloat((max / rate).toFixed(2));

    return { minLimit, maxLimit, isValid: true };
  }, [selectedGateway, exchangeRate]);
};

export default useGatewayLimits;
