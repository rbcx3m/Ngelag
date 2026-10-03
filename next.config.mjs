const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        pathname: '/img/b/**',
      },
    ],
  },
};

export default nextConfig;
