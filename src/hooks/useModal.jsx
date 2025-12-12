"use client";
import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  const handleOkModal = () => {
    setIsModalOpen(false);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    handleShowModal,
    handleOkModal,
    handleCancelModal,
  };
};

export default useModal;
