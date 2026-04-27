import { Suspense } from "react";
import Login from "./_components/Login";
import Loading from "@/components/Loading";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
}
