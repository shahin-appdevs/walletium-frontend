"use client";

import { useAuth } from "@/contexts/AuthContextProvider";
import { token } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token.get()) {
      router.push("/login");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;

  return children;
}
