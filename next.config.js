/** @type {import('next').NextConfig} */

const path = require("path");

const aliases = {
  "@chat": path.join(__dirname, "/"),
};

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
  },
  webpack: (cf) => {
    const config = { ...cf };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...aliases,
    };

    return config;
  },
};

module.exports = nextConfig;
