import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// @see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  webpack: (config) => {
    return {
      ...config,
      watchOptions: {
        ignored: ['**/.*.sw?'],
      },
    };
  },
};

export default withNextIntl(nextConfig);
