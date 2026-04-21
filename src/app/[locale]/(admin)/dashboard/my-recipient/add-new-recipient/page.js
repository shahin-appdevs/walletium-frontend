import AddNewRecipient from "../_components/AddNewRecipient";
import { Suspense } from "react";
import AddNewRecipientSkeleton from "../_components/myRecipientSkeleton/AddRecipientSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<AddNewRecipientSkeleton />}>
      <AddNewRecipient />
    </Suspense>
  );
}
