'use client';

import React from 'react';
import { toast } from 'sonner';

import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Icons } from '@/components/shared/icons';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { TRecordWithChildrenOrCount, TRecordWithoutId } from '@/features/records/types';

import { addRecord, fetchRecordsByParentWithChildrenCount } from '../actions';
import { useAddRecordModal } from './AddRecord';
import { RecordChildren } from './RecordChildren';
import { RecordsListHeader } from './RecordsListHeader';

interface TRecordsListProps extends TPropsWithClassName {
  initialRecords: TRecordWithChildrenOrCount[];
}

export function RecordsList(props: TRecordsListProps) {
  const { className, initialRecords } = props;
  const [isUpdating, startUpdating] = React.useTransition();
  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    initialRecords,
  );
  React.useEffect(() => setChildren(initialRecords), [initialRecords]);
  const hasRecords = !!childrenRecords?.length;

  const onReloadRecords = React.useCallback(() => {
    return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
      startUpdating(async () => {
        try {
          const records = await fetchRecordsByParentWithChildrenCount(null);
          setChildren(records);
          toast.success('Records data has been successfully reloaded');
          resolve(records);
        } catch (error) {
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
        }
      });
    });
  }, []);

  const onAddRootRecord = React.useCallback((newRecord: TRecordWithoutId) => {
    return new Promise<Awaited<ReturnType<typeof addRecord>>>((resolve, reject) => {
      startUpdating(async () => {
        try {
          const addedRecord = await addRecord(newRecord);
          setChildren((records) => {
            return records ? records.concat(addedRecord) : [addedRecord];
          });
          toast.success('Record successfully added');
          resolve(addedRecord);
        } catch (error) {
          const description = getErrorText(error);
          // eslint-disable-next-line no-console
          console.error('[RecordsList:onAddRootRecord]', description, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          const nextMsg = 'Error adding record';
          const nextError = new Error(nextMsg);
          toast.error(nextMsg, {
            description,
          });
          // Re-throw?
          reject(nextError);
        }
      });
    });
  }, []);

  const { invokeAddRecordModal, addRecordModalElement } = useAddRecordModal({
    onAddRecord: onAddRootRecord,
  });

  const addRootRecord = React.useCallback(() => invokeAddRecordModal(null), [invokeAddRecordModal]);

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
          <RecordsListHeader
            handleReloadRecords={onReloadRecords}
            isUpdating={isUpdating}
            handleRootAdd={addRootRecord}
          />
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
          {hasRecords ? (
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
          ) : (
            <div
              className={cn(
                '__RecordsList_ContainerChildrenEmpty', // DEBUG
                'm-auto',
                'p-4',
                'flex flex-col items-center gap-4',
              )}
            >
              <p>No items have been created yet.</p>
              <p>
                <Button
                  title="Add new top-level record"
                  data-button-id="add"
                  variant="ghostBlue"
                  className="flex gap-2 text-green-500 hover:bg-green-400/10 hover:text-green-700 active:bg-green-500 active:text-green-100"
                  // size="icon"
                  onClick={addRootRecord}
                >
                  <Icons.add className="size-5" />
                  <span>Add new record</span>
                </Button>
              </p>
            </div>
          )}
        </MaxWidthWrapper>
      </ScrollArea>
      {addRecordModalElement}
    </div>
  );
}
