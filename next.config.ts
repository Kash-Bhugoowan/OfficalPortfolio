import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is next/image's own default; 90 is added for case-study screenshots
    // and diagrams, where fine text and thin lines make the default's
    // compression visible. Next.js 16 requires qualities used by a `quality`
    // prop to be explicitly allowlisted here.
    qualities: [75, 90],
  },
};

export default nextConfig;
