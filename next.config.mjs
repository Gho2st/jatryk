/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    bodySizeLimit: "5mb", // Możesz ustawić większy limit, jeśli chcesz
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Dodaj tutaj tę linię, aby pozwolić na ładowanie obrazów z Firebase
  },
};

export default nextConfig;
