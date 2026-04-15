import LucideIcon from "@/components/LucideIcon";
import { Divider, Input, Space } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";
import VirtualCard from "../AvailableCards/VirtualCard";

const CardDetailsModal = ({ open, onCancel }) => {
  return (
    <Modal
      width="auto"
      title={
        <div className="flex items-center gap-2 lg:gap-4 divide-y ">
          <div className="rounded-xl bg-primary-900 text-primary-100 p-3">
            <LucideIcon name={"CreditCard"} />
          </div>
          <div>
            <h4>Card Information</h4>
            <p className="text-sm!">
              Move funds within your card, freeze or close it
            </p>
          </div>
        </div>
      }
      open={open}
      onCancel={onCancel}
      centered
      okButtonProps={{ className: "hidden!" }}
      cancelButtonProps={{ className: "hidden!" }}
    >
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="">
          <VirtualCard />
        </div>
        <div className="">
          <h6 className="mb-1">Billing Address</h6>

          <Space.Compact className="w-full!">
            <Input size="large" defaultValue={"Mirpur DOHS"} />
            <Space.Addon className="bg-primary! text-white! border-primary!">
              <LucideIcon name={"Copy"} size={16} />
            </Space.Addon>
          </Space.Compact>
        </div>
      </div>
    </Modal>
  );
};

export default CardDetailsModal;
