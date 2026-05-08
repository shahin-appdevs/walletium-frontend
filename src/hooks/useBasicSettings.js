import { useGetBasicSettingsQuery } from "@/redux/api/basicSettingApi";
import { useMemo } from "react";

/**
 * Custom hook to access basic settings globally.
 * Optimizes performance by memoizing formatted data and leveraging RTK Query caching.
 *
 * @returns {Object} { settings, isLoading, isError, error, refetch }
 */
export const useBasicSettings = () => {
  const {
    data: rawSettings,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetBasicSettingsQuery();

  // Memoize the settings to prevent unnecessary re-renders in components
  const settings = useMemo(() => {
    if (!rawSettings) return null;

    // Here you can format or normalize the settings data if needed
    // For example: mapping colors, standardizing date formats, etc.
    return {
      siteName: rawSettings.site_name || "Walletium",
      logo: rawSettings.logo || "/logo.png",
      currency: rawSettings.currency || "USD",
      currencySymbol: rawSettings.currency_symbol || "$",
      maintenanceMode: !!rawSettings.maintenance_mode,
      // Spread the rest for flexibility
      ...rawSettings,
    };
  }, [rawSettings]);

  return {
    settings,
    isLoading: isLoading || isFetching,
    isError,
    error,
    refetch,
  };
};

export default useBasicSettings;
