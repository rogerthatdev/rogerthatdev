import type { NextConfig } from "next";
import createMDX from "@next/mdx"
import { create } from "domain";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
})

export default withMDX(nextConfig);
