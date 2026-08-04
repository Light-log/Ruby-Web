const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger currently intercepts `/_next/*` and returns 404 before the
  // Next.js runtime can serve the compiled assets. Next 15 serves this prefix
  // itself, while the outer `/devruby-assets` route reaches the Node app.
  assetPrefix: isDevelopment ? undefined : "/devruby-assets",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
