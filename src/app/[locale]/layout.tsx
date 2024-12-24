// import localFont from 'next/font/local';
// import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.scss';
import '@/styles/root.scss';

import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { GenericLayout } from '@/components/layout/GenericLayout';
import { TailwindIndicator } from '@/components/service/TailwindIndicator';
import { fontDefault, fontHeading, fontMono } from '@/assets/fonts';
import { routing } from '@/i18n/routing';
import { TAwaitedLocaleProps, TLocale } from '@/i18n/types';

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  return constructMetadata({
    locale,
  });
}

type TRootLayoutProps = TAwaitedLocaleProps & {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function RootLayout(props: TRootLayoutProps) {
  const { children, params } = props;
  const { locale = routing.defaultLocale } = await params;
  // // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as TLocale)) {
    const error = new Error('Invalid locale: ' + locale);
    // eslint-disable-next-line no-console
    console.error('[layout]', error);
    // TODO? -- Redirect to 'notFound' page?
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      // lang={siteConfig.defaultLang}
      lang={locale}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          'flex flex-col',
          'bg-background font-default antialiased',
          fontDefault.variable,
          fontHeading.variable,
          fontMono.variable,
        )}
        data-layout="clippable" // Default layout mode, could casue flickering
      >
        <NextIntlClientProvider messages={messages}>
          {/* <SessionProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GenericLayout>
              {/* Core content */}
              {children}
            </GenericLayout>
            {/* </ModalProvider> */}
            {/* <Analytics /> */}
            <Toaster richColors closeButton />
            <TailwindIndicator />
          </ThemeProvider>
          {/* </SessionProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
// export default appWithTranslation(RootLayout);
