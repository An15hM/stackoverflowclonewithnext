/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "randomuser.me",
      // },
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    missingSuspenseWithCSRBailout: false,
  },
  // experimental: {
  //   serverActions: true,
  //   mdxRs: true,
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
};

export default nextConfig;
