"use client";
import { Card, Skeleton } from "antd";

export default function KycVerificationSkeleton() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="max-w-xl mx-auto  ">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2">
            <div className="mt-2">
              <Skeleton.Input active style={{ width: 320 }} />
            </div>
            <div className="mt-2">
              <Skeleton.Input active style={{ width: 320, height: 20 }} />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mt-2">
            <Skeleton.Input active style={{ width: 50, height: 15 }} /> <br />
            <Skeleton.Input active style={{ width: 320, height: 40 }} />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 w-full!">
          <div>
            <Skeleton.Input active style={{ width: 50, height: 15 }} /> <br />
            <Skeleton.Input
              active
              className="mt-2 w-full!"
              style={{ width: "100%", height: 40 }}
            />
          </div>

          <div>
            <Skeleton.Input active style={{ width: 50, height: 15 }} /> <br />
            <Skeleton.Input
              active
              className="mt-2 w-full!"
              style={{ width: "100%", height: 40 }}
            />
          </div>

          {/* Submit Button */}
          <Skeleton.Button
            active
            block
            style={{ height: 40, borderRadius: "0.8rem" }}
          />
        </div>

        {/* Back Button */}
        <div className="mt-4">
          <Skeleton.Button
            active
            size="small"
            style={{ width: 180, borderRadius: "1rem" }}
          />
        </div>
      </Card>
    </div>
  );
}
