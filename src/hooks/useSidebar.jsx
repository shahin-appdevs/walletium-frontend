"use client";
import { DashboardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContextProvider";
import LucideIcon from "@/components/LucideIcon";

const useSidebar = () => {
  const router = useRouter();
  const { mode } = useTheme();

  const handleNavigateRoutes = (e) => {
    const ROUTES = {
      dashboard: "/dashboard ",
      addMoney: "/dashboard/add-money",
      sendMoney: "/dashboard/send-money",
      requestMoney: "/dashboard/request-money",
      withdrawMoney: "/dashboard/withdraw-money",

      myCard: "/dashboard/my-card",
      myRecipient: "/dashboard/my-recipient",
      myVoucher: "/dashboard/my-voucher",
      moneyExchange: "/dashboard/money-exchange",

      addMoneyLog: "/dashboard/transactions/add-money-log",
      sendMoneyLog: "/dashboard/transactions/send-money-log",
      withdrawLog: "/dashboard/transactions/withdraw-log",
      moneyExchangeLog: "/dashboard/transactions/money-exchange-log",
      moneyRequestLog: "/dashboard/transactions/money-request-log",
      voucherLog: "/dashboard/transactions/voucher-log",

      setting: "/dashboard/settings",
    };

    const routes = {
      1: ROUTES.dashboard,
      2.1: ROUTES.addMoney,
      2.2: ROUTES.sendMoney,
      2.3: ROUTES.requestMoney,
      2.4: ROUTES.withdrawMoney,

      3.2: ROUTES.myCard,
      3.3: ROUTES.myRecipient,
      3.4: ROUTES.moneyExchange,
      3.5: ROUTES.myVoucher,

      4.1: ROUTES.addMoneyLog,
      4.2: ROUTES.sendMoneyLog,
      4.3: ROUTES.withdrawLog,
      4.4: ROUTES.moneyExchangeLog,
      4.5: ROUTES.moneyRequestLog,
      4.6: ROUTES.voucherLog,

      3: ROUTES.setting,
    };

    router.push(routes[e.key] || "/");
  };

  const items = [
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
  ];

  return { mode, handleNavigateRoutes, items };
};

export default useSidebar;
