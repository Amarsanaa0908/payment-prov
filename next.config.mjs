/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [new URL('https://www.goodprice.mn')],
    domains: ['goodprice.mn', 'cdn.shopify.com']
  }
};

export default nextConfig;
