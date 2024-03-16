/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
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
