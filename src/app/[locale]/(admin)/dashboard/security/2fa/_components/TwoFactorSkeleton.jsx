export default function TwoFactorSkeleton() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Two Factor Authenticator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-6" />

          <div className="space-y-4">
            {/* Label */}
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />

            {/* Input + Copy Button */}
            <div className="flex gap-3">
              <div className="flex-1 h-11 bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
              <div className="h-11 w-20 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* QR Code Area */}
            <div className="flex justify-center py-6">
              <div className="w-48 h-48 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg" />
              </div>
            </div>

            {/* Enable Button */}
            <div className="h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse mt-4" />
          </div>
        </div>

        {/* Right Column - Google Authenticator Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="h-7 w-56 bg-gray-200 rounded animate-pulse mb-6" />

          {/* Description */}
          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Google Authenticator Logo */}
          <div className="flex justify-center my-8">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-linear-to-br from-blue-400 via-red-500 to-yellow-400 rounded-xl opacity-30" />
            </div>
          </div>

          {/* Download Button */}
          <div className="h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
