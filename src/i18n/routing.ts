// @see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { defaultLocale, localesList } from './types';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: localesList,

  // Used when no locale matches
  defaultLocale,

  pathnames: {
    '/': '/',

    // Localized path example
    '/documentation': {
      en: '/documentation',
      ru: '/документация',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
