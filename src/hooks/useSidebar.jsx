"use client";
import { useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContextProvider";
import LucideIcon from "@/components/LucideIcon";
import { useLocale, useTranslations } from "next-intl";

const useSidebar = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const pathname = usePathname();
  const activePath = `/${pathname.split("/").slice(2).join("/")}`;
  const [activeKey, setActiveKey] = useState(activePath);

  const handleNavigateRoutes = (e) => {
    router.push(e.key || "/");
    setActiveKey(e.key);
  };

  const t = useTranslations("Dashboard.sidebar");

  const items = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <span>{t("dashboard")}</span>,
    },
    // {
    //   key: "3",
    //   // icon: <DashboardOutlined />,
    //   label: (
    //     <span className="text-neutral-500 dark:text-neutral-300">My Cards</span>
    //   ),
    // },
    {
      key: "2",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          {t("moneyTransfer")}
        </span>
      ),
      children: [
        {
          key: "/dashboard/add-money",
          label: <span className="text-sm font-semibold">{t("addMoney")}</span>,
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "/dashboard/send-money",
          label: (
            <span className="text-sm font-semibold">{t("sendMoney")}</span>
          ),
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "/dashboard/request-money",
          label: (
            <span className="text-sm font-semibold">{t("requestMoney")}</span>
          ),
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "/dashboard/withdraw-money",
          label: <span className="text-sm font-semibold">{t("withdraw")}</span>,
          icon: <LucideIcon name={"BanknoteArrowDown"} size={14} />,
        },
      ],
    },
    {
      key: "3",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          {t("walletAction")}
        </span>
      ),
      children: [
        {
          key: "/dashboard/my-card",
          label: <span className="text-sm font-semibold">{t("myCard")}</span>,
          icon: <LucideIcon name={"Crown"} size={14} />,
        },
        {
          key: "/dashboard/my-recipient",
          label: (
            <span className="text-sm font-semibold">{t("myRecipients")}</span>
          ),
          icon: <LucideIcon name={"ArrowDownLeft"} size={14} />,
        },

        {
          key: "/dashboard/money-exchange",
          label: (
            <span className="text-sm font-semibold">{t("moneyExchange")}</span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "/dashboard/my-voucher",
          label: (
            <span className="text-sm font-semibold">{t("myVoucher")}</span>
          ),
          icon: <LucideIcon name={"ReceiptText"} size={14} />,
        },
      ],
    },
    {
      key: "4",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          {t("transactionLog")}
        </span>
      ),
      children: [
        {
          key: "/dashboard/transactions/all-transactions",
          label: (
            <span className="text-sm font-semibold">
              {t("allTransactions")}
            </span>
          ),
          icon: <LucideIcon name={"ListFilter"} size={14} />,
        },
        {
          key: "/dashboard/transactions/add-money-log",
          label: (
            <span className="text-sm font-semibold">{t("addMoneyLog")}</span>
          ),
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "/dashboard/transactions/send-money-log",
          label: (
            <span className="text-sm font-semibold">{t("sendMoneyLog")}</span>
          ),
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "/dashboard/transactions/withdraw-log",
          label: (
            <span className="text-sm font-semibold">{t("withdrawLog")}</span>
          ),
          icon: <LucideIcon name={"BanknoteArrowDown"} size={14} />,
        },
        {
          key: "/dashboard/transactions/money-exchange-log",
          label: (
            <span className="text-sm font-semibold">
              {t("moneyExchangeLog")}
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "/dashboard/transactions/money-request-log",
          label: (
            <span className="text-sm font-semibold">
              {t("moneyRequestLog")}
            </span>
          ),
          // icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "/dashboard/transactions/voucher-log",
          label: (
            <span className="text-sm font-semibold">{t("voucherLog")}</span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
      ],
    },

    // {
    //   key: "5",
    //   // icon: <SettingOutlined className="text-neutral-400!" />,
    //   label: (
    //     <span className="text-neutral-400 dark:text-neutral-500 font-normal ">
    //       Settings
    //     </span>
    //   ),
    //   children: [
    //     {
    //       key: "5.1",
    //       label: (
    //         <span className="text-sm font-semibold">KYC Verification</span>
    //       ),
    //       icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
    //     },
    //     {
    //       key: "5.2",
    //       label: <span className="text-sm font-semibold">2FA Security</span>,
    //       icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
    //     },
    //   ],
    // },
    // {
    //   key: "6",
    //   icon: <LucideIcon name={"LogOut"} className="text-red-500!" size={16} />,
    //   label: <span className="text-red-500">Logout</span>,
    // },
  ];

  return { mode, handleNavigateRoutes, items, activeKey };
};

export default useSidebar;

/*   const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <span>Dashboard</span>,
    },
    // {
    //   key: "3",
    //   // icon: <DashboardOutlined />,
    //   label: (
    //     <span className="text-neutral-500 dark:text-neutral-300">My Cards</span>
    //   ),
    // },
    {
      key: "2",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          Money Transfer
        </span>
      ),
      children: [
        {
          key: "2.1",
          label: <span className="text-sm font-semibold">Add Money</span>,
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "2.2",
          label: <span className="text-sm font-semibold">Send Money</span>,
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "2.3",
          label: <span className="text-sm font-semibold">Request Money</span>,
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },

        {
          key: "2.4",
          label: <span className="text-sm font-semibold">Withdraw</span>,
          icon: <LucideIcon name={"BanknoteArrowDown"} size={14} />,
        },
      ],
    },
    {
      key: "3",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          Wallet Action
        </span>
      ),
      children: [
        {
          key: "3.1",
          label: <span className="text-sm font-semibold">My Card</span>,
          icon: <LucideIcon name={"Crown"} size={14} />,
        },
        {
          key: "3.3",
          label: <span className="text-sm font-semibold">My Recipients</span>,
          icon: <LucideIcon name={"ArrowDownLeft"} size={14} />,
        },

        {
          key: "3.4",
          label: <span className="text-sm font-semibold">Money Exchange</span>,
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "3.5",
          label: <span className="text-sm font-semibold">My Voucher</span>,
          icon: <LucideIcon name={"ReceiptText"} size={14} />,
        },
      ],
    },
    {
      key: "4",
      // icon: <UserOutlined />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-medium text-sm">
          Transaction Log
        </span>
      ),
      children: [
        {
          key: "4.1",
          label: <span className="text-sm font-semibold">Add Money Log</span>,
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "4.2",
          label: <span className="text-sm font-semibold">Send Money Log</span>,
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "4.3",
          label: <span className="text-sm font-semibold">Withdraw Log</span>,
          icon: <LucideIcon name={"BanknoteArrowDown"} size={14} />,
        },
        {
          key: "4.4",
          label: (
            <span className="text-sm font-semibold">Money Exchange Log</span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "4.5",
          label: (
            <span className="text-sm font-semibold">Money Request Log</span>
          ),
          // icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "4.6",
          label: <span className="text-sm font-semibold">Voucher Log</span>,
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
      ],
    },

    // {
    //   key: "5",
    //   // icon: <SettingOutlined className="text-neutral-400!" />,
    //   label: (
    //     <span className="text-neutral-400 dark:text-neutral-500 font-normal ">
    //       Settings
    //     </span>
    //   ),
    //   children: [
    //     {
    //       key: "5.1",
    //       label: (
    //         <span className="text-sm font-semibold">KYC Verification</span>
    //       ),
    //       icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
    //     },
    //     {
    //       key: "5.2",
    //       label: <span className="text-sm font-semibold">2FA Security</span>,
    //       icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
    //     },
    //   ],
    // },
    // {
    //   key: "6",
    //   icon: <LucideIcon name={"LogOut"} className="text-red-500!" size={16} />,
    //   label: <span className="text-red-500">Logout</span>,
    // },
  ]; */
