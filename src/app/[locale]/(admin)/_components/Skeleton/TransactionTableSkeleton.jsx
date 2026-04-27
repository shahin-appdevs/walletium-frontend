import { Card, Skeleton } from "antd";

const TransactionTableSkeleton = () => {
  // Create an array of 5 items to represent rows
  const skeletonRows = Array.from({ length: 5 });

  return (
    <Card
      title={<Skeleton.Input active size="small" style={{ width: 120 }} />}
      extra={
        <Skeleton.Button
          active
          shape="round"
          size="small"
          style={{ width: 100 }}
        />
      }
      className="w-full overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header Skeleton */}
          <thead>
            <tr className="border-b border-gray-100 dark:border-neutral-800">
              {[
                "Type",
                "Link",
                "Amount",
                "Total Payable",
                "Created By",
                "Exchange Rate",
                "Fee",
                "Status",
              ].map((header, i) => (
                <th key={i} className="p-4 text-left">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: header === "Link" ? 80 : 60 }}
                  />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body Skeleton */}
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 dark:border-neutral-800 last:border-0"
              >
                {/* Type Column (Icon + 2 lines of text) */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="small" shape="circle" />
                    <div className="space-y-1">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 100, height: 14 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 80, height: 12 }}
                      />
                    </div>
                  </div>
                </td>

                {/* Link Column */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: 120 }}
                    />
                    <Skeleton.Node active style={{ width: 16, height: 16 }} />
                  </div>
                </td>

                {/* Amount */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 70 }} />
                </td>

                {/* Total Payable */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 70 }} />
                </td>

                {/* Created By */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 110 }} />
                </td>

                {/* Exchange Rate */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 90 }} />
                </td>

                {/* Fee/Charge */}
                <td className="p-4">
                  <Skeleton.Input active size="small" style={{ width: 60 }} />
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <Skeleton.Button
                    active
                    shape="round"
                    size="small"
                    style={{ width: 70 }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionTableSkeleton;
