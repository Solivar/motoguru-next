/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'lv', 'ru'],
    defaultLocale: 'lv',
    localeDetection: false,
  },
};

module.exports = nextConfig;
