"use client";

import { Card, Skeleton } from "antd";

export default function SharePageSkeleton() {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Card
        title={<Skeleton.Input active style={{ width: 200, height: 24 }} />}
        className="shadow-md rounded-2xl overflow-hidden border-none"
      >
        {/* Amount Section */}
        <div className="mb-6 p-6 rounded-2xl border border-dashed border-gray-200">
          <Skeleton paragraph={false} title={{ width: 120 }} />
          <Skeleton.Input
            active
            size="large"
            style={{ width: 200, height: 36, marginTop: 8 }}
          />
        </div>

        {/* Summary Items */}
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Skeleton.Avatar active size="small" shape="circle" />
                <Skeleton.Input active style={{ width: 120, height: 16 }} />
              </div>

              <Skeleton.Input active style={{ width: 100, height: 16 }} />
            </div>
          ))}
        </div>

        {/* Remarks */}
        <div className="mt-6 p-4 rounded-xl border border-gray-100">
          <Skeleton.Input active style={{ width: 100, height: 14 }} />
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center">
          <Skeleton.Input active style={{ width: 180, height: 14 }} />
          <div className="mt-4">
            <Skeleton.Button active block style={{ height: 40 }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
