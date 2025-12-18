"use client";
import LucideIcon from "@/components/LucideIcon";
import { Button, Flex, Form, Input, Select, Space } from "antd";
import Image from "next/image";
import ProfileBody from "./_components/ProfileBody";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import ProfileEditModal from "./_components/ProfileEditModal";
import useModal from "@/hooks/useModal";

const options = [
  {
    label: "Bangla",
    value: "bangla",
    emoji: "🇧🇩",
    desc: "Bangla (বাংলা)",
  },
  {
    label: "USA",
    value: "usa",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
  {
    label: "Japan",
    value: "japan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Korea",
    value: "korea",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
];

const ProfilePage = () => {
  const { isModalOpen, handleCancelModal, handleShowModal } = useModal();
  return (
    <div>
      <div
        // style={bannerStyles}
        className="min-h-[17rem] lg:h-[20rem] bg-linear-30 from-[#0EBE98] via-[#50C631] to-[#0EBE98] w-full rounded-lg shadow-lg! flex items-end "
      >
        <div className="relative min-h-[10rem] lg:min-h-[120px] bg-white dark:bg-slate-900 w-full rounded-b-lg">
          <div className=" flex flex-col justify-center  items-center lg:items-end lg:flex-row gap-2 -translate-x-1/2 absolute -top-12 left-1/2 lg:left-0 lg:-translate-x-0 p-4">
            <div className="w-[110px] ">
              <Image
                src={"https://i.pravatar.cc/70"}
                alt="User"
                height={110}
                width={110}
                className="rounded-xl bg-white dark:bg-slate-900 p-1"
              />
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg lg:text-xl font-semibold">Abdullah </h3>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <LucideIcon
                    name={"Mail"}
                    className="text-primary-500!"
                    size={14}
                  />
                  <span className="font-medium">user@appdevs.net</span>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute right-3 top-2 lg:top-1/2 lg:-translate-y-1/2">
            <PrimaryButton onClick={handleShowModal} icon="Edit" iconSize={16}>
              Edit Profile
            </PrimaryButton>
          </div>
        </div>
      </div>
      <ProfileBody />
      <ProfileEditModal open={isModalOpen} onClose={handleCancelModal} />
    </div>
  );
};

export default ProfilePage;
