import React from "react";
import { Skeleton } from "antd";

export default function AddMoneyFieldSkeleton() {
  return (
    <section>
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton.Button
            active
            size="small"
            shape="round"
            style={{ width: 120 }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton.Input active size="small" style={{ width: "40%" }} />
              <Skeleton.Input active size="large" block />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
