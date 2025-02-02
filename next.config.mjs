/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Dodaj tutaj tę linię, aby pozwolić na ładowanie obrazów z Firebase
  },
};

export default nextConfig;
