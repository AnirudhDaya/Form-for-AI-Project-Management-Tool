/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = {
  images: {
      domains: ['picsum.photos'],
  },
}

export default nextConfig;
