'use client';

import React from 'react';
import { toast } from 'sonner';

import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { TRecordWithChildrenOrCount } from '@/features/records/types';

import { fetchRecordsByParentWithChildrenCount } from '../actions';
import { RecordChildren } from './RecordChildren';
import { RecordsListHeader } from './RecordsListHeader';

interface TRecordsListProps extends TPropsWithClassName {
  initialRecords: TRecordWithChildrenOrCount[];
  // handleReloadRecords: () => void;
}

export function RecordsList(props: TRecordsListProps) {
  const {
    className,
    initialRecords,
    // handleReloadRecords,
  } = props;
  const [isUpdating, startUpdating] = React.useTransition();
  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    initialRecords,
  );
  React.useEffect(() => setChildren(initialRecords), [initialRecords]);

  const onReloadRecords = React.useCallback(() => {
    return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
      startUpdating(() => {
        return fetchRecordsByParentWithChildrenCount(null)
          .then((records: TRecordWithChildrenOrCount[]) => {
            console.log('[RecordsList:onReloadRecords] done', {
              records,
            });
            setChildren(records);
            toast.success('Records data has been successfully reloaded');
            resolve(records);
          })
          .catch((error) => {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordsList:onReloadRecords]', description, {
              error,
            });
            debugger; // eslint-disable-line no-debugger
            const nextMsg = 'Error reloading data';
            const nextError = new Error(nextMsg);
            toast.error(nextMsg, {
              description,
            });
            // Re-throw?
            reject(nextError);
          });
      });
    });
  }, []);

  return (
    <div
      className={cn(
        '__RecordsList', // DEBUG
        className,
        'flex flex-col items-center',
        'layout-follow',
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
          <RecordsListHeader handleReloadRecords={onReloadRecords} isUpdating={isUpdating} />
        </MaxWidthWrapper>
      </div>
      <ScrollArea
        className={cn(
          '__RecordsList_Scroll', // DEBUG
          className,
          'flex flex-col items-center',
          'layout-follow',
          commonXPaddingTwStyle,
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
          <RecordChildren
            className={cn(
              '__RecordsList_ContainerChildren', // DEBUG
              isUpdating && 'opacity-50',
              isUpdating && 'cursor-not-allowed',
              isUpdating && 'pointer-events-none',
              'transition-all',
            )}
            childrenRecords={childrenRecords}
            // isUpdating={isUpdating}
          />
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
