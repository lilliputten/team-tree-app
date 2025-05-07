import { getTranslations, setRequestLocale } from 'next-intl/server';

import { cn, constructMetadata } from '@/lib/utils';
import { TestScreen } from '@/components/screens/TestScreen';
import { isDev } from '@/constants';
import { TAwaitedLocaleProps } from '@/i18n/types';

type TTestPageProps = TAwaitedLocaleProps;

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TestPage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

export async function TestPage({ params }: TTestPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <TestScreen
      className={cn(
        isDev && '__TestPage', // DEBUG
      )}
    />
  );
}
