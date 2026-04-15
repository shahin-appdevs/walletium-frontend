/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "abubakkar.appdevs.team" },
      { protocol: "https", hostname: "*" },
    ],
  },
};

export default withNextIntl(nextConfig);
