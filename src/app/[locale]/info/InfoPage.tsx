import { getTranslations, setRequestLocale } from 'next-intl/server';

import { constructMetadata } from '@/lib/utils';
import { InfoScreen } from '@/components/screens/InfoScreen';
import { TAwaitedLocaleProps } from '@/i18n/types';

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'InfoPage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

export async function InfoPage({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  return <InfoScreen />;
}
