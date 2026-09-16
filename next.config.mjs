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
  async redirects() {
    return [
      {
        // Search Console indexaba duplicados bajo `www.devruby.org/...` porque el
        // host `www` (CNAME al CDN de Hostinger) servía la misma app sin
        // redirigir. Una 301 al dominio canónico consolida las señales.
        source: "/:path*",
        has: [{ type: "host", value: "www.devruby.org" }],
        destination: "https://devruby.org/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Next 15 envía `s-maxage=31536000` en las páginas prerenderizadas y el
        // CDN de Hostinger lo respeta durante un año: tras cada despliegue el
        // HTML cacheado sigue apuntando a hashes de chunks que ya no existen y
        // el navegador revienta con ChunkLoadError. Los assets con hash
        // (`/devruby-assets/_next/static/*`) sí pueden seguir siendo inmutables.
        source: "/((?!_next/|devruby-assets/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
