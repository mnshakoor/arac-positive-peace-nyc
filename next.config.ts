import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Photo stories are served from /public/media. Add a remote host here only
    // if media moves to an external store (for example a CDN bucket).
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/events", destination: "/nyc-events", permanent: true },
      { source: "/events/:slug", destination: "/nyc-events/:slug", permanent: true },
      { source: "/press", destination: "/press-media", permanent: true },
      { source: "/press/:slug", destination: "/press-media/:slug", permanent: true },
      { source: "/team", destination: "/about#team", permanent: true },
    ];
  },
};

export default nextConfig;
