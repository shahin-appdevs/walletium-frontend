"use client";

import { useGetKycInputFieldsQuery } from "@/redux/api/authApi";
import VerificationComplete from "./_components/VerificationComplete";
import KycVerificationSkeleton from "./_components/KycVerificationSkeleton";
import KycVerificationPending from "./_components/KycVerificationPending";
import KycVerificationRejected from "./_components/KycVerificationRejected";
import KYCVerification from "./_components/KycVerification";

export default function KycVerified() {
  const {
    data: kycInputFieldData,
    isLoading: kycInputLoading,
    refetch,
  } = useGetKycInputFieldsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // kyc status
  const kycStatus = kycInputFieldData?.data?.status;

  if (kycInputLoading) {
    return <KycVerificationSkeleton />;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      {kycStatus === 0 && (
        <KYCVerification
          inputFields={kycInputFieldData?.data?.input_fields}
          verifyRefetch={refetch}
        />
      )}
      {kycStatus === 1 && <VerificationComplete />}
      {kycStatus === 2 && <KycVerificationPending />}
      {kycStatus === 3 && <KycVerificationRejected />}

      {/* <VerificationComplete /> */}
    </div>
  );
}
