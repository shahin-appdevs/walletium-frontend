"use client";

import { Card, Skeleton } from "antd";
import LucideIcon from "@/components/LucideIcon";

export default function AddNewRecipientSkeleton() {
  return (
    <Card
      title={
        <Skeleton.Input
          active
          size="small"
          style={{ width: 100, marginBottom: 8 }}
        />
      }
      extra={
        <button
          disabled
          className="text-primary cursor-not-allowed flex items-center gap-1 bg-primary-50 rounded-2xl border border-primary px-3 py-1 opacity-70"
        >
          <LucideIcon name={"ArrowLeft"} size={18} />
          <span className="hidden md:block">
            <Skeleton.Button active block size="large" style={{ height: 52 }} />
          </span>
        </button>
      }
    >
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl">
        <div className="space-y-6">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 100, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 100, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
          </div>

          {/* Username/Email + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 140, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 80, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
          </div>

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 60, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 80, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
          </div>

          {/* Country + Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 90, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
            <div>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 100, marginBottom: 8 }}
              />
              <Skeleton.Input active size="large" block />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Skeleton.Button active block size="large" style={{ height: 52 }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
