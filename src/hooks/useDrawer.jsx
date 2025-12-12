"use client";
import { useState } from "react";

const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return {
    isDrawerOpen,
    handleDrawerOpen,
    handleDrawerClose,
  };
};

export default useDrawer;
