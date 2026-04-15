import LucideIcon from "@/components/LucideIcon";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Card, Input, Pagination } from "antd";
import React from "react";
import VirtualCard from "./VirtualCard";

const AvailableCards = () => {
  const CardExtra = (
    <div className="flex items-center gap-2! md:gap-0 ">
      <div className="hidden md:block">
        <Input
          placeholder="Search by card name or number"
          size="large"
          prefix={
            <LucideIcon name={"Search"} size={18} className="text-gray-400" />
          }
          className=" rounded-lg"
        />
      </div>
      <div className="md:hidden">
        <PrimaryButton
          icon={"Search"}
          iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
        ></PrimaryButton>
      </div>
    </div>
  );

  return (
    <>
      <Card title="Available Cards" extra={CardExtra}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 place-items-center">
          {[1, 2, 3, 4].map((item, idx) => (
            <VirtualCard key={idx} />
          ))}
        </div>
        <div className="py-4 flex justify-end">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </Card>
    </>
  );
};

export default AvailableCards;
