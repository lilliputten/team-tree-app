import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

// import { localesList } from '@/i18n/types';

export default createMiddleware(routing);

/* // Using `localesList` to create the i18n prefix regexp
 * const localizedPathReg = `/(${localesList.join('|')})/:path*`;
 */

export const config = {
  matcher: [
    // NOTE: It seems that these values should be hard-coded string literals, so it's impossible to compose it dynamically, from `localesList`

    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|ru)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|favicons|.well-known|.*\\..*).*)',
  ],
};
