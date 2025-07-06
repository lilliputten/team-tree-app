import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { env } from '@/env';
import { getCurrentUser } from '@/lib/session';
import { cn, constructMetadata } from '@/lib/utils';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';
import { welcomeRoute } from '@/constants/routes';
import {
  fetchRecordsByParentWithChildrenCount,
  TFetchRecordsByParentWithChildrenCountParams,
} from '@/features/records/actions';
import { RecordsList } from '@/features/records/components';
import { TRecordWithChildrenOrCount } from '@/features/records/types';
import { TAwaitedLocaleProps } from '@/i18n/types';

type TDataPageProps = TAwaitedLocaleProps;

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DataPage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

export async function DataPage({ params }: TDataPageProps) {
  const { locale } = await params;

  // NOTE: Checking USER_REQUIRED or existed user session
  const user = await getCurrentUser();
  if (!user && env.USER_REQUIRED) {
    redirect(welcomeRoute);
  }

  // Enable static rendering
  setRequestLocale(locale);

  const fetchParams: TFetchRecordsByParentWithChildrenCountParams = {
    parentId: null,
    userId: user?.id || null,
  };
  const rootRecords: TRecordWithChildrenOrCount[] =
    await fetchRecordsByParentWithChildrenCount(fetchParams);

  return (
    <div
      className={cn(
        isDev && '__DataPage', // DEBUG
        'flex flex-1 flex-col items-center',
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <RecordsList initialRecords={rootRecords} />
    </div>
  );
}
