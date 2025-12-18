import { Avatar, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import LucideIcon from "@/components/LucideIcon";

const notifications = [
  {
    id: 1,
    name: "Mia Anders",
    action: "mentioned you in a comment in a thread",
    time: "1h ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Jay Kaufman",
    action: "created a new Goal in the DEV Department",
    time: "4h ago",
    color: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Daniel Mayers",
    action: "rejected a PO",
    time: "08:42",
    color: "bg-orange-500",
  },
  {
    id: 4,
    name: "Daniel Mayers",
    action: "rejected a PO",
    time: "08:42",
    color: "bg-orange-500",
  },
];

export default function NotificationPopup({ onClose }) {
  return (
    <div className=" z-50 w-[330px] rounded-xl bg-white shadow-xl  ">
      {/* Header */}
      <div className="flex py-0! my-0! h-10 items-center justify-between px-4 border-b border-b-neutral-100">
        <span className="font-semibold text-gray-800">Notifications</span>
        <CloseOutlined
          onClick={onClose}
          className="cursor-pointer text-gray-500 hover:text-gray-800"
        />
      </div>

      {/* List */}
      <div className="max-h-[300px] overflow-y-auto px-4 pb-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex  items-start gap-3 py-2 hover:bg-gray-50 rounded-lg px-2  cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0 flex items-center justify-center">
              <LucideIcon name={"Bell"} className={` text-white `} size={18}>
                {item.name.charAt(0)}
              </LucideIcon>
            </div>

            <div className="">
              <div className="text-sm text-gray-700 py-0! my-0!">
                <span className="font-medium">{item.name}</span> {item.action}
                <br />
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
