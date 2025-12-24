"use client";
import LucideIcon from "@/components/LucideIcon";
import Image from "next/image";
import ProfileBody from "./_components/ProfileBody";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
// import ProfileEditModal from "./_components/ProfileEditModal";
import useModal from "@/hooks/useModal";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { getImageUrl } from "@/utils/getImageUrl";
import dynamic from "next/dynamic";
import ProfileSkeleton from "./_components/ProfileSkeleton";

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

const ProfileEditModal = dynamic(
  () => import("./_components/ProfileEditModal"),
  { ssr: false }
);

const ProfilePage = () => {
  const { isModalOpen, handleCancelModal, handleShowModal } = useModal();

  const {
    data: profileData,
    isLoading,
    refetch,
    isError,
  } = useGetProfileQuery();

  if (isLoading) return <ProfileSkeleton />;

  // all countries
  const countries = profileData?.countries?.map((country) => ({
    country_name: country.name,
    mobile_code: country.mobile_code,
  }));

  const userInfo = profileData?.user_info;
  const profileImage = getImageUrl(profileData?.image_paths?.default_image);
  const { email = "", firstname = "", lastname = "" } = userInfo || {};
  const fullName = `${firstname} ${lastname}`;

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
                src={profileImage}
                alt="User"
                height={110}
                width={110}
                className="rounded-xl bg-white dark:bg-slate-900 p-1"
              />
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg lg:text-xl font-semibold">{fullName} </h3>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <LucideIcon
                    name={"Mail"}
                    className="text-primary-500!"
                    size={14}
                  />
                  <span className="font-medium">{email}</span>
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
      <ProfileBody userInfo={userInfo} />
      <ProfileEditModal
        userInfo={{ ...userInfo, profileImage }}
        countries={countries}
        open={isModalOpen}
        onClose={handleCancelModal}
        profileRefetch={refetch}
      />
    </div>
  );
};

export default ProfilePage;
