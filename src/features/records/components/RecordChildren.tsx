'use client';

import React from 'react';
import { Prisma } from '@prisma/client';
import { toast } from 'sonner';

import { TPropsWithClassName } from '@/shared/types/generic';
import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';
import { TRecordId, TRecordWithChildrenOrCount } from '@/features/records/types';

import { deleteRecordWithChidren } from '../actions/deleteRecordWithChidren';
import { useConfirmDeleteRecordModal } from './DeleteRecord';
import { RecordItem } from './RecordItem';

interface TRecordChildrenProps extends TPropsWithClassName {
  parentId?: TRecordId | null;
  childrenRecords?: TRecordWithChildrenOrCount[];
  isOpen?: boolean;
  handleUpdatedRecords?: (records: TRecordWithChildrenOrCount[]) => void;
  isUpdating?: boolean;
}

export function RecordChildren(props: TRecordChildrenProps) {
  const {
    className,
    parentId,
    childrenRecords: initialChildren,
    isOpen,
    handleUpdatedRecords,
    isUpdating: isParentUpdating,
  } = props;
  const [isUpdating, startUpdating] = React.useTransition();
  const memo = React.useMemo<{ removingRecords: TRecordId[] }>(() => ({ removingRecords: [] }), []);

  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    initialChildren,
  );
  React.useEffect(() => {
    setChildren(initialChildren);
  }, [parentId, initialChildren]);

  const onDeleteRecord = React.useCallback(
    (recordId: TRecordId) => {
      return new Promise<Prisma.BatchPayload>((resolve, reject) => {
        startUpdating(async () => {
          if (!memo.removingRecords.includes(recordId)) {
            memo.removingRecords.push(recordId);
          }
          try {
            const payload = await deleteRecordWithChidren(recordId);
            const { count: removedRecordsCount } = payload;
            if (childrenRecords) {
              const updatedRecords = childrenRecords.filter(({ id }) => id !== recordId);
              if (handleUpdatedRecords) {
                handleUpdatedRecords(updatedRecords);
              } else {
                setChildren(updatedRecords);
              }
            }
            toast.success('Successfully removed records: ' + removedRecordsCount);
            resolve(payload);
          } catch (error) {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordChildren:onDeleteRecord]', description, {
              error,
            });
            debugger; // eslint-disable-line no-debugger
            const nextMsg = 'Error removing record';
            const nextError = new Error(nextMsg);
            toast.error(nextMsg, {
              description,
            });
            // Re-throw?
            reject(nextError);
          } finally {
            memo.removingRecords = memo.removingRecords.filter((id_1) => id_1 !== recordId);
          }
        });
      });
    },
    [handleUpdatedRecords, childrenRecords, memo],
  );

  const handleUpdateRecord = React.useCallback((record: TRecordWithChildrenOrCount) => {
    setChildren((prevChildren) => {
      if (!prevChildren) {
        throw new Error('Tried to update child for uninitalized parent');
      }
      const updatedChildren = prevChildren.map((it) => (it.id === record.id ? record : it));
      return updatedChildren;
    });
  }, []);

  const { invokeConfirmDeleteRecordModal, confirmDeleteRecordModalElement } =
    useConfirmDeleteRecordModal({ onDeleteRecord });

  const isRoot = !parentId;
  const childrenCount = childrenRecords ? childrenRecords.length : 0;
  const showContent = (isOpen || isRoot) && !!childrenCount;

  return (
    <div
      className={cn(
        '__RecordChildren', // DEBUG
        className,
      )}
      data-record-id={parentId || 'root'}
    >
      <div
        className={cn(
          '__RecordChildren_Content', // DEBUG
          'pt-2',
          !isRoot && 'pl-7',
          !showContent && 'hidden',
        )}
      >
        {childrenRecords?.map((record) => {
          return (
            <RecordItem
              key={record.id}
              record={record}
              isUpdating={
                isParentUpdating || (isUpdating && memo.removingRecords.includes(record.id))
              }
              handleDelete={invokeConfirmDeleteRecordModal}
              handleUpdate={handleUpdateRecord}
            />
          );
        })}
      </div>
      {confirmDeleteRecordModalElement}
    </div>
  );
}
