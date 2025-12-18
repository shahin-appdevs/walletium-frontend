"use client";

import KYCVerificationForm from "./_componets/KycVerification";
import VerificationComplete from "./_componets/VerificationComplete";

export default function KycVerified() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <KYCVerificationForm />
      {/* <VerificationComplete /> */}
    </div>
  );
}
