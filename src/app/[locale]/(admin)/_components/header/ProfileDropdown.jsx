import { Card } from "antd";
import {
  SendOutlined,
  PlusCircleOutlined,
  ArrowDownOutlined,
  UserOutlined,
  SafetyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { token, userInfo } from "@/lib/token";
import showToast from "@/lib/toast";
import { useLogoutMutation } from "@/redux/api/authApi";
import useModal from "@/hooks/useModal";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProfileDropdown({ userInfo: userProfileInfo }) {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const { isModalOpen, handleCancelModal, handleShowModal } = useModal();
  const t = useTranslations("Dashboard.header.dropdownProfile");

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      // success message

      const successMessages = getSuccessMessage(result);
      successMessages.forEach((message) => showToast.success(message));

      //remove store data
      token.remove();
      userInfo.remove();

      //redirect
      router.replace("/login");
    } catch (error) {
      const errMessages = getErrorMessage(error);
      errMessages.forEach((err) => {
        showToast.error(err);
      });
    }
  };

  return (
    <Card className="w-72 rounded-2xl shadow-xl border-0 ">
      {/* Header */}
      <Link
        href={"/dashboard/my-profile"}
        className="flex items-center gap-3 p-2  hover:bg-gray-100! dark:hover:bg-primary-500! rounded-xl  "
      >
        <Image
          src={userProfileInfo?.image}
          className="w-12 h-12 rounded-full"
          alt="profile"
          height={50}
          width={50}
          decoding="async"
        />
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-neutral-50">
            {userProfileInfo?.fullname}
          </h4>
          <p className="text-sm text-gray-500 dark:text-neutral-50">
            {userProfileInfo?.email}
          </p>
        </div>
      </Link>
      <Divider />

      {/* Menu List */}
      <div className="mt-2 space-y-1 ">
        <MenuItem
          href={"/dashboard/send-money"}
          icon={<SendOutlined className="dark:text-neutral-300!" />}
          label={
            <span className="dark:text-neutral-300!">{t("sendMoney")}</span>
          }
        />
        <MenuItem
          href={"/dashboard/add-money"}
          icon={<PlusCircleOutlined className="dark:text-neutral-300!" />}
          label={<span className="dark:text-neutral-300!">{t("addFund")}</span>}
        />
        <MenuItem
          href={"/dashboard/withdraw-money"}
          icon={<ArrowDownOutlined className="dark:text-neutral-300!" />}
          label={
            <span className="dark:text-neutral-300!">{t("withdraw")}</span>
          }
        />

        <Divider />

        <MenuItem
          href={"/dashboard/security/kyc-verification"}
          icon={<UserOutlined className="dark:text-neutral-300!" />}
          label={
            <span className="dark:text-neutral-300!">
              {t("kycVerification")}
            </span>
          }
        />
        <MenuItem
          href={"/dashboard/security/2fa"}
          label={
            <span className="dark:text-neutral-300!">
              {t("twoFactorSecurity")}
            </span>
          }
          icon={<SafetyOutlined className="dark:text-neutral-300!" />}
        />

        <Divider />

        <button
          onClick={handleShowModal}
          className={`w-full flex items-center gap-3 px-1 py-2 rounded-lg text-left 
         text-red-600 font-semibold hover:bg-gray-100 dark:hover:bg-primary-500 dark:hover:text-neutral-50 dark:font-medium transition`}
        >
          <span className="text-xl">
            <LogoutOutlined />
          </span>
          <span className="text-sm">{t("logout")}</span>
        </button>
      </div>
      <ConfirmationModal
        open={isModalOpen}
        onCancel={handleCancelModal}
        onConfirm={handleLogout}
        loading={isLoading}
        message={t("logoutConfirmation")}
        confirmBtn={t("logout")}
      />
    </Card>
  );
}

function MenuItem({ icon, label, danger, href }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href ? href : "/dashboard")}
      className={`w-full flex items-center gap-3 px-1 py-2 rounded-lg text-left 
        ${danger ? "text-red-600 font-semibold" : "text-gray-700"} 
        hover:bg-gray-100 dark:hover:bg-primary-500 dark:hover:text-neutral-50 dark:font-medium transition`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function Divider() {
  return (
    <div className="my-2 border-t border-gray-100 dark:border-neutral-800"></div>
  );
}
