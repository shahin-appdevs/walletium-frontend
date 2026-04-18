import React from "react";
import AddMoney from "./_components/AddMoney/AddMoney";
import { Suspense } from "react";

export default function page() {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <AddMoney />
      </Suspense>
    </section>
  );
}
