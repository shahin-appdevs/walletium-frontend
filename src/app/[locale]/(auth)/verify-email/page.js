import React, { Suspense } from "react";
import EmailVerifySkeleton from "./_components/EmailVerifySkeleton";
import dynamic from "next/dynamic";

const EmailVerify = dynamic(() => import("./_components/EmailVerify"), {
  loading: EmailVerifySkeleton,
});

export default function page() {
  return (
    <div>
      <Suspense fallback={<EmailVerifySkeleton />}>
        <EmailVerify />
      </Suspense>
    </div>
  );
}
