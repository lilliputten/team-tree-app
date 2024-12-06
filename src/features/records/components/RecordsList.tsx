import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { TRecordWithChildrenOrCount } from '@/features/records/types';

import { RecordItem } from './RecordItem';
import { RecordsListHeader } from './RecordsListHeader';

interface TRecordsListProps extends TPropsWithClassName {
  initialRecords: TRecordWithChildrenOrCount[];
}

export function RecordsList(props: TRecordsListProps) {
  const { className, initialRecords } = props;
  return (
    <div
      className={cn(
        '__RecordsList', // DEBUG
        className,
        'flex flex-col items-center',
        'layout-follow',
        // 'my-4',
      )}
    >
      <div
        className={cn(
          '__RecordsList_HeaderWrapper', // DEBUG
          'flex w-full flex-col',
          'm-auto',
          'bg-gray-400/20',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            '__RecordsList_HeaderContainer', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
          )}
        >
          <RecordsListHeader />
        </MaxWidthWrapper>
      </div>
      <ScrollArea
        className={cn(
          '__RecordsList_Scroll', // DEBUG
          className,
          'flex flex-col items-center',
          'layout-follow',
          commonXPaddingTwStyle,
          // 'my-4',
        )}
      >
        <MaxWidthWrapper
          className={cn(
            '__RecordsList_Container', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
            'my-4',
          )}
        >
          {initialRecords.map((record) => {
            return <RecordItem key={record.id} record={record} />;
          })}
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
