"use client";
import { token } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Protected({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!token.get()) {
      router.replace("/login");
      return;
    }
    (() => setMounted(true))();
  }, [router]);

  if (!mounted) return null;

  return children;
}
