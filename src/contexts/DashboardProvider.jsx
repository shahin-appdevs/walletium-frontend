import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardContext = createContext(null);

export const useDashboardContext = () => useContext(DashboardContext);

const DashboardProvider = ({ children }) => {
  const router = useRouter();

  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetDashboardQuery();

  const { twoFactorStatus } = useSelector((state) => state.auth);

  const values = {
    dashboardData,
    wallets: dashboardData?.wallets,
    userInfo: dashboardData?.user_info,
    dashboardLoading,
    dashboardRefetch: refetch,
  };

  // loading before mount dashboard api
  //   if (dashboardLoading) return <div>Loading...</div>;

  useEffect(() => {
    // Redirect to 2FA verification if required
    if (twoFactorStatus === 1) {
      router.push("/2fa-verify");
      return;
    }

    // Only attempt redirect once loading is finished and data exists
    if (!dashboardLoading && isSuccess && dashboardData) {
      const { email_verified, kyc_verified } = dashboardData?.user_info || {};

      // Redirect if either is unverified (0)
      if (email_verified === 0) {
        router.push("/verify-email");
      } else if (kyc_verified === 0) {
        // router.push("/kyc-onboarding");
      }
    }
  }, [dashboardData, twoFactorStatus, dashboardLoading, isSuccess]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
