/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "abubakkar.appdevs.team" },
      { protocol: "https", hostname: "*" },
    ],
  },
};

export default nextConfig;
