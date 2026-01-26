"use client";

import { token } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GuestOnly = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token.get()) {
      router.replace("/dashboard");
      return;
    }
    (() => setLoading(false))(); //self call
  }, []);

  if (loading) return null;

  return <>{children}</>;
};

export default GuestOnly;
