'use client';

import React from 'react';
import { toast } from 'sonner';

import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';

import { addRecord, fetchRecordsByParentWithChildrenCount } from '../actions';
import { TFetchParentId, TRecordWithChildrenOrCount, TRecordWithoutId } from '../types';
import { useAddRecordModal } from './AddRecord';
import { RecordChildren } from './RecordChildren';
import { RecordHeader } from './RecordHeader';

interface TRecordItemProps {
  record: TRecordWithChildrenOrCount;
  isUpdating?: boolean;
  handleDelete: (record: TRecordWithChildrenOrCount) => void;
}

export function RecordItem(props: TRecordItemProps) {
  const { record, isUpdating: isParentUpdating, handleDelete } = props;
  const { id } = record;
  const [isOpen, setOpen] = React.useState(false);
  const [isUpdating, startUpdating] = React.useTransition();
  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    record.children,
  );
  React.useEffect(() => {
    setChildren(record.children);
    if (!record.children) {
      setOpen(false);
    }
  }, [record]);
  const hasLoaded = childrenRecords != undefined;
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);

  const handleUpdatedRecords = React.useCallback((records: TRecordWithChildrenOrCount[]) => {
    setChildren(records);
  }, []);

  const handleLoadChildrenForParent = React.useCallback((parentId: TFetchParentId) => {
    return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
      startUpdating(async () => {
        try {
          const fetchedRecords = await fetchRecordsByParentWithChildrenCount(parentId);
          setChildren(fetchedRecords);
          toast.success('Records has been loaded');
          resolve(fetchedRecords);
        } catch (error) {
          const description = getErrorText(error);
          // eslint-disable-next-line no-console
          console.error('[RecordItem:handleLoadChildrenForParent]', description, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          const nextMsg = 'Error loading children records';
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

  const onAddRecord = React.useCallback(
    (newRecord: TRecordWithoutId) => {
      return new Promise<Awaited<ReturnType<typeof addRecord>>>((resolve, reject) => {
        startUpdating(async () => {
          try {
            const promises = [
              // Add record...
              addRecord(newRecord),
              // Fetch records if hasn't been fetched yet...
              !childrenRecords ? fetchRecordsByParentWithChildrenCount(record.id) : undefined,
            ].filter(Boolean);
            const results = await Promise.all(promises);
            const addedRecord = results[0] as TRecordWithChildrenOrCount;
            const addedId = addedRecord.id;
            const fetchedRecords = (results[1] as TRecordWithChildrenOrCount[]) || childrenRecords;
            const containsAdded = fetchedRecords.find(({ id }) => id === addedId);
            const updatedRecords = containsAdded
              ? fetchedRecords
              : fetchedRecords.concat(addedRecord);
            setChildren(updatedRecords);
            toast.success('Record successfully added');
            // Open children if had been closed before
            setOpen(true);
            resolve(addedRecord);
          } catch (error) {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordItem:onAddRecord]', description, {
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
    },
    [childrenRecords, record],
  );

  const { invokeAddRecordModal, addRecordModalElement } = useAddRecordModal({ onAddRecord });

  return (
    <div
      // ...
      className={cn(
        '__RecordItem', // DEBUG
        'transition-all',
        'rounded p-2 pr-0',
        'active:bg-blue-400/10',
        'hover:bg-blue-400/5',
      )}
      data-record-id={id}
    >
      <RecordHeader
        record={record}
        childrenRecords={childrenRecords}
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleLoadChildrenForParent={handleLoadChildrenForParent}
        isUpdating={isUpdating || isParentUpdating}
        hasLoaded={hasLoaded}
        handleDelete={handleDelete}
        handleAdd={invokeAddRecordModal}
      />
      <RecordChildren
        parentId={record.id}
        childrenRecords={childrenRecords}
        isOpen={isOpen}
        handleUpdatedRecords={handleUpdatedRecords}
        isUpdating={isUpdating || isParentUpdating}
        // hasLoaded={hasLoaded}
      />
      {addRecordModalElement}
    </div>
  );
}
