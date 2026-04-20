import React from "react";
import AddMoney from "./_components/AddMoney/AddMoney";
import { Suspense } from "react";
import AddMoneyPageSkeleton from "./_components/AddMoneySkeleton/AddMoneyPageSkeleton";

export default function page() {
  return (
    <section>
      <Suspense fallback={<AddMoneyPageSkeleton />}>
        <AddMoney />
      </Suspense>
    </section>
  );
}
