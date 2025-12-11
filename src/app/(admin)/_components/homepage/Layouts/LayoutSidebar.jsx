"use client";
import { Layout, Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContextProvider";
import LucideIcon from "@/components/LucideIcon";

const logo = "/images/logo/logo.png";

const { Sider } = Layout;

const LayoutSidebar = ({ collapsed }) => {
  const router = useRouter();
  const { mode } = useTheme();
  // const [background, setBackground] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     if (mode === "dark") {
  //       return "#000";
  //     }
  //   }
  //   return "#fff";
  // });

  const handleNavigateRoutes = (e) => {
    const ROUTES = {
      dashboard: "/",
      money_transfer: "/users",
      setting: "/settings",
    };

    const routes = {
      1: ROUTES.dashboard,
      2: ROUTES.money_transfer,
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
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Add Money
            </span>
          ),
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "2.3",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Send Money
            </span>
          ),
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "2.2",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Request Money
            </span>
          ),
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "2.4",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Money Exchange
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "2.5",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Withdraw
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "2.6",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Money Exchange
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
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
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              My Card
            </span>
          ),
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "3.3",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              My Recipients
            </span>
          ),
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "3.2",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              My Voucher
            </span>
          ),
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "3.4",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Money Exchange
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "3.5",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Withdraw
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
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
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Add Money Log
            </span>
          ),
          icon: <LucideIcon name={"CirclePlus"} size={14} />,
        },
        {
          key: "4.3",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Send Money Log
            </span>
          ),
          icon: <LucideIcon name={"Send"} size={14} />,
        },
        {
          key: "4.2",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Withdraw Log
            </span>
          ),
          icon: <LucideIcon name={"HandCoins"} size={14} />,
        },
        {
          key: "4.4",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Money Exchange Log
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "4.5",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Money Request Log
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "4.6",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              Voucher Log
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
      ],
    },

    {
      key: "5",
      // icon: <SettingOutlined className="text-neutral-400!" />,
      label: (
        <span className="text-neutral-400 dark:text-neutral-500 font-normal ">
          Settings
        </span>
      ),
      children: [
        {
          key: "5.1",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              KYC Verification
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
        {
          key: "5.2",
          label: (
            <span className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
              2FA Security
            </span>
          ),
          icon: <LucideIcon name={"ArrowRightLeft"} size={14} />,
        },
      ],
    },
    {
      key: "6",
      icon: <LucideIcon name={"LogOut"} className="text-red-500!" size={16} />,
      label: <span className="text-red-500">Logout</span>,
    },
  ];

  return (
    <div className="hidden sidebar lg:block">
      {/* Desktop Sidebar */}
      <Sider
        collapsible
        width={252}
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        theme={mode}
        collapsedWidth="0"
        // style={{ background: background }}
        className="sticky! top-0! h-screen! overflow-y-auto overflow-x-hidden! sidebar-main"
      >
        <div className="p-2 lg:px-4  lg:py-8">
          <Image
            src={
              "https://abubakkar.appdevs.team/walletium/public/backend/images/web-settings/image-assets/seeder/white-logo.webp"
            }
            height={100}
            width={200}
            alt="Logo"
          />
        </div>
        {/* <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 8,
          }}
        /> */}
        <Menu
          onClick={handleNavigateRoutes}
          openKeys={["2", "3", "5", "4"]}
          theme={mode}
          mode="inline"
          className="font-medium text-lg overflow-hidden! pb-4!"
          defaultSelectedKeys={["1"]}
          items={items}
          expandIcon={null}
        />
      </Sider>
    </div>
  );
};

export default LayoutSidebar;
