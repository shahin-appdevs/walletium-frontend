import { Card, Skeleton } from "antd";

export default function ProfileSkeleton() {
  return (
    <div>
      {/* Banner Skeleton */}
      <div className="min-h-[17rem] lg:h-[20rem] w-full rounded-lg shadow-lg bg-gray-200 dark:bg-slate-800 relative">
        <div className="absolute bottom-0 w-full bg-white dark:bg-slate-900 rounded-b-lg p-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 -translate-y-12">
            {/* Avatar */}
            <Skeleton.Avatar size={110} shape="square" active />

            {/* Name & Email */}
            <div className="flex flex-col items-center lg:items-start gap-2">
              <Skeleton.Input style={{ width: 180 }} active />
              <Skeleton.Input style={{ width: 220 }} size="small" active />
            </div>
          </div>

          {/* Edit Button */}
          <div className="absolute right-4 top-4 lg:top-1/2 lg:-translate-y-1/2">
            <Skeleton.Button active />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* About Card */}
        <Card>
          <Skeleton active title={{ width: 120 }} paragraph={{ rows: 5 }} />
        </Card>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Change Password */}
          <Card>
            <Skeleton active title={{ width: 160 }} paragraph={{ rows: 2 }} />
            <div className="mt-4">
              <Skeleton.Button active />
            </div>
          </Card>

          {/* Delete Account */}
          <Card>
            <Skeleton active title={{ width: 140 }} paragraph={{ rows: 2 }} />
            <div className="mt-4">
              <Skeleton.Button active />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
