// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-test.elred.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets-pretest.elred.io",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
