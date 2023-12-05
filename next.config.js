/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
            //   pathname: '/img/logos/**',
            },
            {
              protocol: 'https',
              hostname: 'upload.wikimedia.org',
              port: ''
            }
          ],
    },
}

module.exports = nextConfig
