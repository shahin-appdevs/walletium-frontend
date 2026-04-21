import SendMoney from "./_components/SendMoney";
import { Suspense } from "react";
import SendMoneyPageSkeleton from "./_components/SendMoneySkeleton/SendMoneyPageSkeleton";

export default function Page() {
  return (
    <section aria-label="Send Money">
      <Suspense fallback={<SendMoneyPageSkeleton />}>
        <SendMoney />
      </Suspense>
    </section>
  );
}
