"use client";

import React from "react";
import useBasicSettings from "@/hooks/useBasicSettings";

const SettingsExample = () => {
  const { settings, isLoading, isError, error, refetch } = useBasicSettings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="ml-3 text-gray-500 italic">Loading system settings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <h3 className="text-red-700 font-bold mb-2">Error Loading Settings</h3>
        <p className="text-red-600 text-sm">
          {error?.message || "Something went wrong."}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="flex items-center space-x-4 mb-6">
        {settings?.logo && (
          <img
            src={settings.logo}
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {settings?.siteName}
          </h2>
          <p className="text-sm text-gray-500 italic">
            Global App Settings Ready
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-600 font-medium">Default Currency</span>
          <span className="text-gray-900 font-bold">
            {settings?.currency} ({settings?.currencySymbol})
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-600 font-medium">Maintenance Mode</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              settings?.maintenanceMode
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {settings?.maintenanceMode ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">
            Raw Data Preview
          </p>
          <pre className="bg-gray-50 p-3 rounded-md text-[10px] overflow-auto max-h-32 text-gray-700 border border-gray-200">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>

        <button
          onClick={() => refetch()}
          className="w-full mt-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-md"
        >
          Refresh Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsExample;
