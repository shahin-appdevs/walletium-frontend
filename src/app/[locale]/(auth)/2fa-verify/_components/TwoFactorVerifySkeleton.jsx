import React from "react";

export default function TwoFactorVerifySkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 animate-pulse">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-[50px] w-[200px] bg-gray-200 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-6 w-40 bg-gray-200 rounded mx-auto" />

        {/* Subtitle */}
        <div className="h-4 w-60 bg-gray-200 rounded mx-auto" />

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-10 h-12 bg-gray-200 rounded-md" />
          ))}
        </div>

        {/* Error (optional placeholder) */}
        <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />

        {/* Button */}
        <div className="h-12 w-full bg-gray-200 rounded-md" />

        {/* Footer text */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
