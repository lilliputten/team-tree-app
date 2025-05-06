import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { defaultLocale, localesList } from './types';

export const pathnames = {
  '/': '/',

  '/welcome': '/welcome',

  // Localized path example
  '/info': {
    en: '/info',
    ru: '/информация',
  },
};

// @see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: localesList,

  // Used when no locale matches
  defaultLocale,

  pathnames,
});

export type Pathnames = keyof typeof routing.pathnames;

export const {
  // Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
