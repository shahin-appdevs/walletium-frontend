/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

if (process.env.NODE_ENV === "development") {
  const { initOpenNextCloudflareForDev } =
    await import("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}

const nextConfig = {
  /* config options here */
  turbopack: false,

  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    "/**": [".next/server/chunks/**", ".next/server/chunks/ssr/**"],
  },
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   { protocol: "https", hostname: "**" },
    //   { protocol: "https", hostname: "*" },
    // ],
  },
  allowedDevOrigins: ["192.168.68.*"],
};

export default withNextIntl(nextConfig);
