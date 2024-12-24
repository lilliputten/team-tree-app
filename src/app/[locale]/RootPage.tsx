import { getTranslations, setRequestLocale } from 'next-intl/server';

import { cn, constructMetadata } from '@/lib/utils';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { fetchRecordsByParentWithChildrenCount } from '@/features/records/actions';
import { RecordsList } from '@/features/records/components';
import { TRecordWithChildrenOrCount } from '@/features/records/types';
import { TAwaitedLocaleProps } from '@/i18n/types';

type TRootPageProps = TAwaitedLocaleProps;

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RootPage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

export async function RootPage({ params }: TRootPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const rootRecords: TRecordWithChildrenOrCount[] =
    await fetchRecordsByParentWithChildrenCount(null);

  return (
    <div
      className={cn(
        '__RootPage', // DEBUG
        'flex flex-1 flex-col items-center',
        // 'justify-center', // Content in the middle of the page
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <RecordsList initialRecords={rootRecords} />
    </div>
  );
}
