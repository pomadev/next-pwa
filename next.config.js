/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lxqjnptvoxmjlwvjbqhu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/avatars/**',
      },
    ],
  },
})
