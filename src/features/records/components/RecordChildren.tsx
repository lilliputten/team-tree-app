import { cn } from '@/lib/utils';
import { TRecordWithChildrenOrCount } from '@/features/records/types';

import { RecordItem } from './RecordItem';

interface TRecordChildrenProps {
  record: TRecordWithChildrenOrCount;
  childrenRecords?: TRecordWithChildrenOrCount[];
  isOpen?: boolean;
  hasLoaded?: boolean;
  isUpdating?: boolean;
}

export function RecordChildren(props: TRecordChildrenProps) {
  const {
    // Data...
    record,
    childrenRecords,
    // TODO: Use these for styles
    isOpen,
    // hasLoaded,
    // isUpdating,
  } = props;
  const {
    id,
    // name,
    _count, // : { children: childrenCount },
  } = record;
  const childrenCount = childrenRecords ? childrenRecords.length : _count ? _count.children : 0;
  const showContent = isOpen && !!childrenRecords && !!childrenCount;
  // const childrenCount = getChildrenCount(record);
  return (
    <div
      className={cn(
        '__RecordChildren', // DEBUG
      )}
      data-record-id={id}
    >
      <div
        className={cn(
          '__RecordChildren_Content', // DEBUG
          'pl-7 pt-2',
          !showContent && 'hidden',
        )}
      >
        {childrenRecords?.map((record) => {
          return <RecordItem key={record.id} record={record} />;
        })}
      </div>
    </div>
  );
}
