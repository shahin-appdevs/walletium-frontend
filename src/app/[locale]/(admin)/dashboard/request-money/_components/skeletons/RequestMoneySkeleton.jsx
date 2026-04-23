import { Card, Skeleton } from "antd";

const RequestMoneySkeleton = () => {
  return (
    <section className="animate-pulse">
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          {/* Left Column: Form (Span 3) */}
          <div className="col-span-1 md:col-span-3">
            <Card
              title={
                <Skeleton.Input active size="small" style={{ width: 150 }} />
              }
              className="h-full!"
            >
              <div className="rounded-2xl p-4 bg-neutral-50 dark:bg-slate-900 border border-transparent dark:border-neutral-800">
                <div className="space-y-6">
                  {/* Amount Input Label & Field */}
                  <div className="space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: 120 }}
                    />
                    <div className="flex gap-0">
                      <Skeleton.Button active style={{ flex: 1, height: 40 }} />
                      <Skeleton.Button
                        active
                        style={{ width: 100, height: 40 }}
                      />
                    </div>
                  </div>

                  {/* Remarks Label & Textarea */}
                  <div className="space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: 100 }}
                    />
                    <Skeleton.Node
                      active
                      style={{ width: "100%", height: 100 }}
                    >
                      <div />
                    </Skeleton.Node>
                  </div>

                  {/* Limits and Charges Badges */}
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <Skeleton.Button
                      active
                      shape="round"
                      style={{ width: 180 }}
                    />
                    <Skeleton.Button
                      active
                      shape="round"
                      style={{ width: 180 }}
                    />
                  </div>

                  {/* Submit Button */}
                  <Skeleton.Button
                    active
                    block
                    style={{ height: 48, borderRadius: "12px" }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Summary (Span 2) */}
          <div className="col-span-1 md:col-span-2">
            <Card
              title={
                <Skeleton.Input active size="small" style={{ width: 100 }} />
              }
              className="h-full!"
            >
              <div className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 border border-transparent dark:border-neutral-800">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800 last:border-0"
                    >
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 100 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 60 }}
                      />
                    </div>
                  ))}
                  {/* Total Payable Row */}
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton.Input
                      active
                      size="default"
                      style={{ width: 140 }}
                    />
                    <Skeleton.Input
                      active
                      size="default"
                      style={{ width: 80 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Section: Transaction Table */}
        <div className="mt-6">
          <Card>
            <div className="space-y-4">
              <Skeleton.Input active size="large" style={{ width: "30%" }} />
              <Skeleton active paragraph={{ rows: 4 }} title={false} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RequestMoneySkeleton;
