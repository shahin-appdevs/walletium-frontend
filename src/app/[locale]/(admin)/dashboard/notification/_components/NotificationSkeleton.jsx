import { Card, Skeleton } from "antd";

const NotificationSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <Card
      title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
      extra={
        <div className="flex items-center gap-3">
          <Skeleton.Button
            active
            shape="round"
            size="small"
            style={{ width: 110 }}
          />
          <Skeleton.Button
            active
            shape="round"
            size="small"
            style={{ width: 110 }}
          />
        </div>
      }
      className="w-full"
    >
      {/* Tabs skeleton */}
      <div className="flex gap-4 mb-5 border-b border-gray-100 dark:border-neutral-800 pb-3">
        {["All", "Unread", "Read"].map((tab) => (
          <Skeleton.Button
            key={tab}
            active
            shape="round"
            size="small"
            style={{ width: 50 }}
          />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-neutral-800">
              {[120, 60, 60, 80].map((w, i) => (
                <th key={i} className="p-4 text-left">
                  <Skeleton.Input active size="small" style={{ width: w }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 dark:border-neutral-800 last:border-0"
              >
                {/* Notification column */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="default" shape="circle" />
                    <div className="space-y-1.5">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 160, height: 14 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 220, height: 12 }}
                      />
                    </div>
                  </div>
                </td>
                {/* Time column */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 80 }} />
                </td>
                {/* Status column */}
                <td className="p-4">
                  <Skeleton.Button
                    active
                    shape="round"
                    size="small"
                    style={{ width: 65 }}
                  />
                </td>
                {/* Action column */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <Skeleton.Button
                      active
                      size="small"
                      style={{ width: 28, minWidth: 28 }}
                    />
                    <Skeleton.Button
                      active
                      size="small"
                      style={{ width: 28, minWidth: 28 }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default NotificationSkeleton;
