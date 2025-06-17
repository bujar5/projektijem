import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
   env: {
     MONGODB_URI: "mongodb+srv://bujardema24:l7MYzPyTVRgSi5gX@cluster0.niustpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
     NEXTAUTH_SECRET:"FuXtAZkA7OozIXS/iOjuTHds1Ou4VdoHNGyxOzFd4q4=",
  }
};

export default nextConfig;