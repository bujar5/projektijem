import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // REMOVE THIS 'env' BLOCK if you're using a .env file:
   env: {
     MONGODB_URI: "mongodb+srv://bujardema24:l7MYzPyTVRgSi5gX@cluster0.niustpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  }
};

export default nextConfig;