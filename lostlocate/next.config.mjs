// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log('rewritees');
    return [
      {
        source: '/users/register',
        destination: '/api/users/register', 
      },
    ];
  },
};
export default nextConfig;