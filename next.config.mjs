/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/aura-needs', // Yeh GitHub Pages ka sub-folder path hai
  images: {
    unoptimized: true, // GitHub par Next.js ki image optimization nahi chalti
  },
};

export default nextConfig;