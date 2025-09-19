// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ignore ESLint errors in production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config) {
    // Exclude .svg from Next.js's default file loader
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // apply to TS/JS files only
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: { overrides: { removeViewBox: false } },
                },
                { name: "removeDimensions", active: true },
              ],
            },
            ref: true,
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
