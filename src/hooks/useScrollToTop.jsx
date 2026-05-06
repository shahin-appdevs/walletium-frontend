"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to the top of the window
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run whenever the URL path changes
};

export default useScrollToTop;
