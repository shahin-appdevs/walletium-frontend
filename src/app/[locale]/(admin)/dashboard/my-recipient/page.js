import React, { Suspense } from "react";
import RecipientList from "./_components/RecipientList";
import RecipientListSkeleton from "./_components/myRecipientSkeleton/RecipientListSkeleton";

const MyRecipientsPage = () => {
  return (
    <section>
      <Suspense fallback={<RecipientListSkeleton />}>
        <RecipientList />
      </Suspense>
    </section>
  );
};

export default MyRecipientsPage;
