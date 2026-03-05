/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: '/QuizJS-Responsive', // IMPORTANT: Replace with your exact GitHub repository name
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
