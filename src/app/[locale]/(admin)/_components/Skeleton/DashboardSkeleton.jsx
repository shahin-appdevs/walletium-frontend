const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* 1. Sidebar Skeleton */}
      <aside className="w-64 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hidden lg:flex flex-col p-4 space-y-6">
        <div className="h-10 w-32 bg-gray-200 dark:bg-neutral-800 rounded mb-8" />{" "}
        {/* Logo */}
        {[...Array(3)].map((_, sectionIdx) => (
          <div key={sectionIdx} className="space-y-3">
            <div className="h-3 w-20 bg-gray-100 dark:bg-neutral-800 rounded ml-2" />{" "}
            {/* Section Title */}
            {[...Array(4)].map((_, itemIdx) => (
              <div key={itemIdx} className="flex items-center gap-3 px-2 py-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-800 rounded" />
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 2. Top Navbar Skeleton */}
        <header className="h-16 border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-800" />
            <div className="w-20 h-8 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-800" />
          </div>
        </header>

        {/* 3. Dashboard Body Skeleton */}
        <div className="p-6 space-y-6 animate-pulse">
          {/* Header Action Bar */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-3 w-32 bg-gray-200 dark:bg-neutral-800 rounded" />
              <div className="h-7 w-40 bg-gray-300 dark:bg-neutral-700 rounded" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-28 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg" />
              <div className="h-10 w-28 bg-emerald-500/20 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Currency Grid (8 Columns) */}
            <div className="col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gray-200 dark:bg-neutral-800 rounded" />
                    <div className="h-3 w-32 bg-gray-100 dark:bg-neutral-800 rounded" />
                  </div>
                  <div className="h-6 w-20 bg-gray-300 dark:bg-neutral-700 rounded" />
                </div>
              ))}
            </div>

            {/* Virtual Card & Quick Actions (4 Columns) */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                <div className="h-5 w-32 bg-gray-200 dark:bg-neutral-800 rounded mb-6" />
                <div className="aspect-[1.6/1] w-full bg-gray-300 dark:bg-neutral-800 rounded-2xl mb-6" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-10 w-28 bg-emerald-500/20 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <div className="h-5 w-48 bg-gray-200 dark:bg-neutral-800 rounded mb-8" />
            <div className="h-48 w-full bg-gray-50 dark:bg-neutral-800/50 rounded-lg border-b border-gray-200 dark:border-neutral-700 flex items-end justify-around px-4 pb-2">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="w-1/20 bg-gray-200 dark:bg-neutral-700 rounded-t"
                  //   style={{ height: `${20 + Math.random() * 60}%`, width: "4%" }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;
