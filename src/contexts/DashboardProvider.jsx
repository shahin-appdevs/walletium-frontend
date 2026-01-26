import { token } from "@/lib/token";
import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

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
    // Only attempt redirect once loading is finished and data exists
    if (!dashboardLoading && isSuccess && dashboardData) {
      const { email_verified, kyc_verified } = dashboardData?.user_info || {};

      // Redirect if either is unverified (0)
      if (email_verified === 0) {
        router.push("/verify-email");
      } else if (kyc_verified === 0) {
        router.push("/kyc-onboarding");
      }
    }
  }, [dashboardData]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
