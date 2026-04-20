import React from "react";
import { Card, Skeleton } from "antd";

export default function AddMoneyPageSkeleton() {
  return (
    <section>
      <div className="space-y-6">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Column - Form Skeleton */}
          <div className="md:col-span-3">
            <Card
              title={<Skeleton.Input active size="small" />}
              className="h-full"
            >
              {/* Exchange Rate & Balance Skeleton */}
              <div className="bg-neutral-50 dark:bg-slate-900 mb-6 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton.Avatar active size="small" shape="circle" />
                  <Skeleton.Avatar active size="small" shape="circle" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "60%" }}
                    />
                    <Skeleton.Input active size="large" block />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "60%" }}
                    />
                    <Skeleton.Input active size="large" block />
                  </div>
                </div>
              </div>

              {/* Form Skeleton */}
              <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6">
                  <div className="space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "30%" }}
                    />
                    <Skeleton.Input active size="large" block />
                  </div>
                  <div className="space-y-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "30%" }}
                    />
                    <Skeleton.Input active size="large" block />
                  </div>
                </div>
                <Skeleton.Button
                  active
                  size="large"
                  block
                  style={{ height: 48 }}
                  className="rounded-2xl"
                />
              </div>
            </Card>
          </div>

          {/* Summary Column Skeleton */}
          <div className="md:col-span-2">
            <Card
              title={<Skeleton.Input active size="small" />}
              className="h-full"
            >
              <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between py-2">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "40%" }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "20%" }}
                    />
                  </div>
                ))}
                <Skeleton.Button active size="large" block className="mt-4" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
