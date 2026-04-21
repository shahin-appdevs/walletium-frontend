"use client";

import { Skeleton } from "antd";

export default function RecipientListSkeleton() {
  return (
    <>
      <div className="space-y-3">
        {/* Table Header Skeleton */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800">
          <div className="col-span-5">
            <Skeleton active paragraph={false} title={{ width: "60%" }} />
          </div>
          <div className="col-span-3">
            <Skeleton active paragraph={false} title={{ width: "70%" }} />
          </div>
          <div className="col-span-2 hidden md:block">
            <Skeleton active paragraph={false} title={{ width: "50%" }} />
          </div>
          <div className="col-span-2 text-right hidden md:block">
            <Skeleton active paragraph={false} title={{ width: "40%" }} />
          </div>
        </div>

        {/* Table Rows Skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-slate-950"
          >
            {/* Name Column */}
            <div className="col-span-5 flex items-center gap-3">
              <Skeleton.Avatar active size={40} shape="circle" />
              <div className="flex-1">
                <Skeleton active paragraph={false} title={{ width: "75%" }} />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 120, marginTop: 4 }}
                />
              </div>
            </div>

            {/* Country */}
            <div className="col-span-3  items-center hidden md:flex">
              <Skeleton active paragraph={false} title={{ width: "65%" }} />
            </div>

            {/* Zip Code */}
            <div className="col-span-2  items-center hidden md:flex">
              <Skeleton active paragraph={false} title={{ width: "55%" }} />
            </div>

            {/* Actions */}
            <div className="col-span-2  items-center justify-end gap-4 hidden md:flex">
              <Skeleton.Button active size="small" shape="circle" />
              <Skeleton.Button active size="small" shape="circle" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
