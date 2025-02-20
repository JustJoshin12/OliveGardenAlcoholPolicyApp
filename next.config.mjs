/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
      if (dev) {
        config.cache = false; // disable only in development
      }
      return config;
    },
  };
  
  export default nextConfig;
  