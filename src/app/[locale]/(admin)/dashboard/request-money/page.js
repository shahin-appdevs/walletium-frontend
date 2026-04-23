import { Suspense } from "react";
import RequestMoney from "./_components/RequestMoney";
import RequestMoneySkeleton from "./_components/skeletons/RequestMoneySkeleton";

export default function Page() {
  return (
    <Suspense fallback={<RequestMoneySkeleton />}>
      <RequestMoney />
    </Suspense>
  );
}
