"use client";
import { User, Check, PhoneCall, Mail } from "lucide-react";

import { Button, Card, Checkbox } from "antd";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import useModal from "@/hooks/useModal";

const ProfileItem = ({ property, value, icon }) => {
  return (
    <div className="flex items-center gap-2 text-base justify-between pb-2">
      <span className="flex items-center gap-2">
        {/* <Icon icon={icon} /> */}
        <span>{property} </span>
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

const ProfileBody = ({ userInfo }) => {
  const { isModalOpen, handleCancelModal, handleShowModal } = useModal();
  const [isRemoveBtnActive, setIsRemoveBtnActive] = useState(false);
  const [isChangeBtnActive, setIsChangeBtnActive] = useState(false);

  const {
    email = "",
    firstname = "",
    lastname = "",
    country = "",
    address = "",
    mobile = "",
    city = "",
    state = "",
    zip_code = "",
    mobile_code = "",
  } = userInfo;
  const fullName = `${firstname} ${lastname}`;

  const profileData = [
    {
      property: "Full Name",
      value: fullName || "N/A",
    },
    {
      property: "Country",
      value: country || "N/A",
    },
    {
      property: "Phone",
      value: `${mobile_code}${mobile}`,
    },
    {
      property: "Email",
      value: email || "N/A",
    },
    {
      property: "Address",
      value: address || "N/A",
    },
    {
      property: "City",
      value: city || "N/A",
    },
    {
      property: "State",
      value: state || "N/A",
    },
    {
      property: "Zip Code",
      value: zip_code || "N/A",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2  mt-4">
      <div className="space-y-4!">
        {/* About */}
        <Card>
          <div className="space-y-4! h-full!">
            <div>
              <h4
                className="text-lg lg:text-xl font-thin
               text-neutral-400 mb-4"
              >
                About
              </h4>

              <div className="divide-y lg:text-base divide-gray-200 dark:divide-gray-800 space-y-2 ">
                {profileData.map((item, idx) => (
                  <ProfileItem
                    key={idx}
                    property={item.property}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            {/* <div className="space-y-2 lg:text-base">
              <h4 className="text-lg font-normal text-neutral-400">Contacts</h4>

              <ProfileItem
                icon={PhoneCall}
                property="Contact No."
                value="+8801676446077"
              />
              <ProfileItem
                icon={Mail}
                property="Email"
                value="akbarprice@gmail.com"
              />
            </div> */}
          </div>
        </Card>
      </div>
      <div className="space-y-4!">
        {/* Delete Account */}
        <Card className="md:h-[calc(50%-0.5rem)]!">
          <h4 className="text-lg font-thin text-neutral-500">
            Change Password
          </h4>

          <div className="flex flex-col gap-2 lg:gap-4 mt-2">
            <Checkbox onChange={() => setIsChangeBtnActive(!isChangeBtnActive)}>
              <span className="text-sm md:text-base">
                I want change my password
              </span>
            </Checkbox>

            <Button
              onClick={handleShowModal}
              type="primary"
              danger
              disabled={!isChangeBtnActive}
            >
              Change Password
            </Button>
          </div>
        </Card>
        <Card className="md:h-[calc(50%-0.5rem)]!">
          <h4 className="text-lg font-thin text-neutral-500">Delete Account</h4>

          <div className="flex flex-col gap-2 lg:gap-4 mt-2">
            <Checkbox onChange={() => setIsRemoveBtnActive(!isRemoveBtnActive)}>
              <span className="text-sm md:text-base">
                I confirm my account deactivation
              </span>
            </Checkbox>

            <Button type="primary" danger disabled={!isRemoveBtnActive}>
              Remove
            </Button>
          </div>
        </Card>
      </div>
      <ChangePasswordModal
        userInfo={userInfo}
        open={isModalOpen}
        onClose={handleCancelModal}
      />
    </div>
  );
};

export default ProfileBody;
