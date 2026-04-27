import ShareLink from "../_components/ShareLink";
import { Suspense } from "react";
import SharePageSkeleton from "../_components/skeletons/SharePageSkeleton";

export default function ShareLinkPage() {
  return (
    <Suspense fallback={<SharePageSkeleton />}>
      <ShareLink />
    </Suspense>
  );
}
