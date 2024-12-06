import { siteConfig } from '@/config/site';
import { cn, constructMetadata } from '@/lib/utils';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { fetchRecordsByParentWithChildrenCount } from '@/features/records/actions';
import { RecordsList } from '@/features/records/components';
import { TRecordWithChildrenOrCount } from '@/features/records/types';

export const pageTitle = 'Editor';
export const pageDescription = 'Editor page';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export async function RootPage() {
  const rootRecords: TRecordWithChildrenOrCount[] =
    await fetchRecordsByParentWithChildrenCount(null);
  return (
    <div
      className={cn(
        '__RootPage', // DEBUG
        'flex flex-1 flex-col items-center',
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <RecordsList initialRecords={rootRecords} />
    </div>
  );
}
