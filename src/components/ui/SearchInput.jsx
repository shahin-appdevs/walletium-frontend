"use client";
import { Input, Modal } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import useViewport from "@/hooks/useViewport";

const SearchInput = ({ value, onChange, isFetching, placeholder }) => {
  const { smallScreen } = useViewport();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      (() => setIsSearchModalOpen(false))();
    }
  }, [isFetching]);

  const inputElement = (
    <Input
      placeholder={placeholder}
      size="large"
      prefix={<SearchOutlined className="text-gray-400" />}
      suffix={isFetching && <LoadingOutlined className="text-primary" />}
      className="rounded-lg w-full md:w-64"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  if (smallScreen) {
    return (
      <div className="flex items-center gap-2">
        <PrimaryButton
          icon={"Search"}
          onClick={() => setIsSearchModalOpen(true)}
          iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
          className="!px-3"
        />
        <Modal
          title={placeholder}
          open={isSearchModalOpen}
          onCancel={() => setIsSearchModalOpen(false)}
          footer={null}
          centered
        >
          <div className="py-4">{inputElement}</div>
        </Modal>
      </div>
    );
  }

  return inputElement;
};

export default SearchInput;
