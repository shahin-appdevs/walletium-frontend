"use client";
import { useEffect, useState } from "react";

const useViewport = () => {
  const [area, setArea] = useState(null);
  const [smallScreen, setSmallScreen] = useState(null);
  const [mediumScreen, setMediumScreen] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setArea(window.innerWidth);
      if (area < 639) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }

      if (area > 639 && area < 1024) {
        setMediumScreen(true);
      } else {
        setMediumScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, [area]);

  return { area, smallScreen, mediumScreen };
};

export default useViewport;
