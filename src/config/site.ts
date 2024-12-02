import { env } from '@/env.mjs';
import { SiteConfig } from '@/shared/types/site/SiteConfig';

const siteUrl = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'Team Tree',
  description: 'Team tree editor',
  url: siteUrl,
  ogImage: `/static/opengraph-image.jpg`,
  links: {
    website: 'https://example.com/',
    github: 'https://github.com/lilliputten/team-tree-app',
  },
  mailSupport: 'support@example.com',
};
