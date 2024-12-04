import { env } from '@/env';
import { SiteConfig } from '@/shared/types/site/SiteConfig';
import appInfoModule from '@/app-info.json';

const siteUrl = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'Team Tree',
  description: 'Team tree editor',
  defaultLang: 'ru',
  locale: 'ru_RU',
  versionInfo: appInfoModule.versionInfo,
  url: siteUrl,
  ogImage: `/static/opengraph-image.jpg`,
  links: {
    website: 'https://example.com/',
    github: 'https://github.com/lilliputten/team-tree-app',
  },
  mailSupport: 'support@example.com',
};
