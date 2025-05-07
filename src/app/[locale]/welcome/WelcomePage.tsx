import { getTranslations, setRequestLocale } from 'next-intl/server';

import { commonXPaddingTwStyle } from '@/config/ui';
import { cn, constructMetadata } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';
import { TAwaitedLocaleProps } from '@/i18n/types';

type TWelcomePageProps = TAwaitedLocaleProps;

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WelcomePage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

export async function WelcomePage({ params }: TWelcomePageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // DEBUG: Check long content fit
  const demo = Array.from(new Array(60)).map((_, n) => <p key={`demo-${n + 1}`}>{n + 1}</p>);

  return (
    <div
      className={cn(
        isDev && '__WelcomePage', // DEBUG
        'flex flex-1 flex-col items-center',
        'justify-center', // Content in the middle of the page
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      {/* Show welcome/login page or redirect to it
       */}
      <ScrollArea
        className={cn(
          isDev && '__WelcomePage:Container', // DEBUG
          'flex flex-col items-center',
          'justify-center', // Content in the middle of the page
          'layout-follow',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            isDev && '__WelcomePage:MaxWidthWrapper', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
          )}
        >
          <h2>Welcome</h2>
          {demo}
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
