import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // React Compiler disabled — it pre-executes Leaflet components before the
  // DOM is ready, causing "Cannot read properties of undefined (appendChild)"
  // even behind ssr:false dynamic imports and useEffect mount guards.
  reactCompiler: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
