import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    MONGODB_URI: "mongodb+srv://bujardema24:ZXYK51TUP9to9TXC@cluster0.niustpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

  }

}
  ;

export default nextConfig;
