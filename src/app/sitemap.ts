import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getPathname, routing } from '@/i18n/routing';
import { TLocale } from '@/i18n/types';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // prettier-ignore
    getEntry('/'),
    getEntry('/documentation'),
  ];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(href: Href, locale: TLocale) {
  const pathname = getPathname({ locale, href });
  return siteConfig.url + pathname;
}
