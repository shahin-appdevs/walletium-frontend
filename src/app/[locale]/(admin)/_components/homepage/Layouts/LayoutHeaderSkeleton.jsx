import { Skeleton, Avatar } from "antd";

export default function LayoutHeaderSkeleton() {
  return (
    <header className="w-full bg-white  px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Menu Icon */}
        <Skeleton.Button active size="small" shape="circle" />

        {/* Welcome Text */}
        <Skeleton.Input active size="small" style={{ width: 220 }} />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Skeleton.Button active size="small" shape="circle" />

        {/* Language */}
        <Skeleton.Button active size="small" shape="circle" />

        {/* Notification */}
        <Skeleton.Button active size="small" shape="circle" />

        {/* User Avatar */}
        <Skeleton.Avatar active size="large" shape="circle" />
      </div>
    </header>
  );
}
