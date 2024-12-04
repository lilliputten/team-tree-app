// import localFont from 'next/font/local';
// import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.scss';
import '@/styles/root.scss';

import { siteConfig } from '@/config/site';
import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { NavBar } from '@/components/layout/NavBar';
import { NavMobile } from '@/components/layout/NavMobile';
import { SiteFooter } from '@/components/layout/SiteFooter';
// import ModalProvider from '@/components/modals/providers';
import { TailwindIndicator } from '@/components/tailwindIndicator';
import { fontDefault, fontHeading, fontMono } from '@/assets/fonts';

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.defaultLang} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'flex flex-col',
          'bg-background font-default antialiased',
          fontDefault.variable,
          fontHeading.variable,
          fontMono.variable,
        )}
      >
        {/* <SessionProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ModalProvider> */}
          <NavMobile />
          <NavBar />
          {children}
          <SiteFooter />
          {/* </ModalProvider> */}
          {/* <Analytics /> */}
          <Toaster richColors closeButton />
          <TailwindIndicator />
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
