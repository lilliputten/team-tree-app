import localFont from 'next/font/local';
// import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

// import Router from 'next/router'

import '@/styles/globals.scss';

import { siteConfig } from '@/config/site';
import { tailwindClippingLayout } from '@/lib/helpers/tailwind';
import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
// import ModalProvider from '@/components/modals/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
          'max-w-screen max-h-screen min-h-screen',
          'bg-background font-sans antialiased',
          tailwindClippingLayout({ vertical: true }),
          geistSans.variable,
          geistMono.variable,
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
          {children}
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
