import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Proxy Strapi uploads through Next.js so other devices on the network can
  // load media via the Next.js port instead of needing direct Strapi access.
  // Rewrites are only active in `npm run dev`; they are ignored by `next build`.
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:1337/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
