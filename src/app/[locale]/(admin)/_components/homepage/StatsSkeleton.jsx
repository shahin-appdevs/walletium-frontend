"use client";

const StatsSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between pb-4 lg:pb-6 animate-pulse">
        {/* Left */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-7 w-32 bg-gray-300 dark:bg-slate-600 rounded" />
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 rounded-xl bg-gray-300 dark:bg-slate-700" />
          <div className="h-10 w-32 rounded-xl bg-gray-300 dark:bg-slate-700" />
        </div>
      </div>

      {/* Currency Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-4 flex flex-col gap-3 animate-pulse"
          >
            {/* Icon Section */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-slate-700" />
              <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-slate-700" />
            </div>

            {/* Text Section */}
            <div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-6 w-32 bg-gray-300 dark:bg-slate-600 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSkeleton;
