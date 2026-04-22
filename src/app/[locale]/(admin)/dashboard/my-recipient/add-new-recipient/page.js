import AddNewRecipient from "../_components/AddNewRecipient";
import { Suspense } from "react";
import AddNewRecipientSkeleton from "../_components/myRecipientSkeleton/AddRecipientSkeleton";

export default async function Page({ searchParams }) {
  const search = await searchParams;
  return (
    <Suspense fallback={<AddNewRecipientSkeleton />}>
      <AddNewRecipient searchParams={search} />
    </Suspense>
  );
}
