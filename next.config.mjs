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
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  allowedDevOrigins: ["192.168.68.*"],
  experimental: {
    // Inline critical CSS into <head> and defer the rest.
    // Removes render-blocking CSS for the initial paint.
    // Requires `critters` (auto-installed by Next.js on first build).
    optimizeCss: true,
    // Tree-shake icon libraries — only bundles icons actually used per page.
    optimizePackageImports: ["lucide-react", "framer-motion", "antd"],
  },
};

export default withNextIntl(nextConfig);
