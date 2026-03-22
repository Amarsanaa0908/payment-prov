/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // ⚠️ Accepts any HTTPS hostname
            },
            {
                protocol: 'http',
                hostname: '**', // ⚠️ Accepts any HTTP hostname
            },
        ],
    }
};

export default nextConfig;
