import useSidebar from "@/hooks/useSidebar";
import { Skeleton } from "antd";
import Sider from "antd/es/layout/Sider";

export default function LayoutSidebarSkeleton() {
  const { mode } = useSidebar();
  return (
    <>
      <div className="hidden sidebar lg:block lg:fixed lg:top-0 lg:start-0 lg:h-screen lg:z-30 transition-none!">
        {/* Desktop Sidebar — match LayoutSidebar's `fixed` positioning so the
            content column's `ms-(--sidebar-offset)` isn't double-counted
            against a sticky skeleton (which would take flow space too). */}
        <Sider
          collapsible
          width={252}
          //   collapsed={collapsed}
          trigger={null}
          breakpoint="lg"
          theme={mode}
          collapsedWidth="0"
          className="h-screen! overflow-y-auto overflow-x-hidden! sidebar-main"
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
