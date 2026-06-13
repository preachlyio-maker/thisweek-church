import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lint in dev/CI, not during the production build — a flaky flat-config
  // resolution shouldn't be able to block a deploy. (Type-checking stays on.)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
