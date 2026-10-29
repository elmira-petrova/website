import { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const webpack: NextConfig["webpack"] = (config) => {
  // @ts-expect-error rule any
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test?.test?.(".svg"),
  );

  config.module.rules.push(
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /react/] },
    },
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: /react/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            exportType: "named",
            memo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  );

  fileLoaderRule.exclude = /\.svg$/i;

  config.module.rules.push({
    test: /\.(mp4|mov)$/i,
    type: "asset/resource",
  });

  return config;
};

const sassOptions: NextConfig["sassOptions"] = {
  silenceDeprecations: ["import", "global-builtin", "if-function"],
};

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  webpack,
  sassOptions,
  images: {
    unoptimized: true,
  },
  typedRoutes: true,
  experimental: {
    scrollRestoration: true,
    clientTraceMetadata: ["traceparent", "tracestate", "baggage"],
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
