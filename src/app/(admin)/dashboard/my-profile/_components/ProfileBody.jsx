"use client";
import { User, Check, PhoneCall, Mail } from "lucide-react";

import { Button, Card, Checkbox } from "antd";
import { useState } from "react";

const ProfileItem = ({ property, value, icon }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-2">
        {/* <Icon icon={icon} /> */}
        <span>{property} :</span>
      </span>
      <span>{value}</span>
    </div>
  );
};

const ProfileBody = () => {
  const [isRemoveBtnActive, setIsRemoveBtnActive] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {/* About */}
      <Card>
        <div className="space-y-2 lg:text-base">
          <h4 className="text-lg font-thin text-neutral-500">About</h4>

          <ProfileItem
            icon={User}
            property="Full Name"
            value="Abdullah Al Jawad"
          />
          <ProfileItem icon={Check} property="Status" value="Active" />
        </div>
      </Card>

      {/* Contacts */}
      <Card>
        <div className="space-y-2 lg:text-base">
          <h4 className="text-lg font-thin text-neutral-500">Contacts</h4>

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
        </div>
      </Card>

      {/* Overview */}
      <Card>
        <div className="space-y-2 lg:text-base">
          <h4 className="text-lg font-thin text-neutral-500">Overview</h4>

          <ProfileItem
            icon={User}
            property="Full Name"
            value="Abdullah Al Jawad"
          />
          <ProfileItem icon={Check} property="Status" value="Active" />
        </div>
      </Card>

      {/* Delete Account */}
      <Card>
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
  );
};

export default ProfileBody;
