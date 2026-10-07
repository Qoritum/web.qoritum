import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/*": ["./content/projects/**/*.mdx"] },
}

export default nextConfig
