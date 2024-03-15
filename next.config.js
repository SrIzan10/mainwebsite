/** @type {import('next').NextConfig} */
export const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'img.srizan.dev'
            },
            {
                hostname: 'res.cloudinary.com'
            }
        ]
    }
}