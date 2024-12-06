import { cn } from '@/lib/utils';
import { TRecordWithChildrenOrCount } from '@/features/records/types';

import { RecordItem } from './RecordItem';

interface TRecordChildrenProps {
  record: TRecordWithChildrenOrCount;
  childrenRecords?: TRecordWithChildrenOrCount[];
  isOpen?: boolean;
  hasLoaded?: boolean;
  isUpdating?: boolean;
  // handleOpen: () => void;
  // handleClose: () => void;
}

export function RecordChildren(props: TRecordChildrenProps) {
  const {
    // Data...
    record,
    childrenRecords,
    // TODO: Use these for styles
    isOpen,
    hasLoaded,
    isUpdating,
  } = props;
  const {
    id,
    // name,
  } = record;
  const showContent = isOpen && childrenRecords;
  // const childrenCount = getChildrenCount(record);
  return (
    <div
      className={cn(
        '__RecordChildren', // DEBUG
      )}
      data-record-id={id}
    >
      {showContent && (
        <div
          className={cn(
            '__RecordChildren_Content', // DEBUG
          )}
        >
          {childrenRecords.map((record) => {
            return (
              <RecordItem
                key={record.id}
                record={record}
                // fetchRecordsByParent={fetchRecordsByParentWithChildren}
              />
            );
          })}
          {/*
          {hasLoaded ? 'OK ' : '? '}
          {isUpdating && '(...) '}
          Children ({childrenCount}): {id} {name}
          */}
        </div>
      )}
    </div>
  );
}
