"use client";
import { token } from "@/lib/token";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSkeleton from "../../(admin)/_components/Skeleton/DashboardSkeleton";

export function Protected({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!token.get()) {
      const fullPath =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");

      router.replace(`/login?redirect=${encodeURIComponent(fullPath)}`);
    }
    (() => setMounted(true))();
  }, [pathname, searchParams, router]);

  // ✅ block render until auth is known
  if (!token.get()) return <DashboardSkeleton />;

  //old

  // useEffect(() => {
  //   if (!token.get()) {
  //     router.replace("/login");
  //     return;
  //   }
  //   (() => setMounted(true))();
  // }, [router]);

  if (!mounted) return <DashboardSkeleton />;

  return children;
}
