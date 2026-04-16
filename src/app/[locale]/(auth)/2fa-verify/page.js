import React, { Suspense } from "react";
import TwoFactorVerify from "./_components/TwoFactorVerify";
import TwoFactorVerifySkeleton from "./_components/TwoFactorVerifySkeleton";

export default function page() {
  return (
    <div>
      <Suspense fallback={<TwoFactorVerifySkeleton />}>
        <TwoFactorVerify />
      </Suspense>
    </div>
  );
}
