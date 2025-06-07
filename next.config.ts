import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    env: {
      MONGODB_URI:"mongorestore --uri mongodb+srv://bujardema24:<4yTbrODTJazDdr8n>@myapplication.mar8xs2.mongodb.net"
    }
  }
;

export default nextConfig;
