import useSidebar from "@/hooks/useSidebar";
import { Skeleton } from "antd";
import Sider from "antd/es/layout/Sider";

export default function LayoutSidebarSkeleton() {
  const { mode } = useSidebar();
  return (
    <>
      <div className="hidden sidebar lg:block ">
        {/* Desktop Sidebar */}
        <Sider
          collapsible
          width={252}
          //   collapsed={collapsed}
          trigger={null}
          breakpoint="lg"
          theme={mode}
          collapsedWidth="0"
          // style={{ background: background }}
          className="sticky! top-0! h-screen! overflow-y-auto overflow-x-hidden!  sidebar-main transition-none!"
        >
          <div className="p-2 lg:px-4  lg:py-8 space-y-4!">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <Skeleton.Avatar active size={36} shape="square" />
              <Skeleton.Input active size="small" className="w-28!" />
            </div>

            {/* Dashboard */}
            <div className="space-y-3 mb-6">
              <Skeleton.Input active size="small" className="w-32!" />
            </div>

            {/* Money Transfer Section */}
            <div className="space-y-4!">
              <Skeleton.Input
                active
                size="small"
                className="w-24! opacity-60 mb-4! "
              />

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton.Avatar active size={20} shape="circle" />
                  <Skeleton.Input active size="small" className="w-36!" />
                </div>
              ))}
            </div>

            {/* Wallet Action Section */}
            <div className="space-y-4!">
              <Skeleton.Input
                active
                size="small"
                className="w-24! opacity-60 "
              />

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton.Avatar active size={20} shape="circle" />
                  <Skeleton.Input active size="small" className="w-36!" />
                </div>
              ))}
            </div>

            {/* Transaction Log Section */}
            <div className="space-y-4!">
              <Skeleton.Input
                active
                size="small"
                className="w-28! opacity-60 "
              />

              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton.Avatar active size={20} shape="circle" />
                  <Skeleton.Input active size="small" className="w-40!" />
                </div>
              ))}
            </div>
          </div>
        </Sider>
      </div>
    </>
  );
}
