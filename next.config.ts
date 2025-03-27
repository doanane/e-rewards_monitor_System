// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure ESLint to ignore during builds (temporary solution)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: false, // Set to true only if needed temporarily
  },
  
  // Add any other Next.js configuration you need
  images: {
    domains: ['example.com'], // Add domains for external images
  },
  
  // Optional: Enable SWC minification (faster builds)
  swcMinify: true,
}

module.exports = nextConfig