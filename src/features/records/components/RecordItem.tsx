'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';
import { useSessionUser } from '@/hooks/useSessionUser';
import { isDev } from '@/constants';

import { addRecord, fetchRecordsByParentWithChildrenCount, updateRecord } from '../actions';
import { TFetchParentId, TNewRecord, TRecord, TRecordWithChildrenOrCount } from '../types';
import { useEditRecordModal } from './EditRecord';
import { RecordChildren } from './RecordChildren';
import { RecordHeader } from './RecordHeader';

interface TRecordItemProps {
  record: TRecordWithChildrenOrCount;
  isUpdating?: boolean;
  handleDelete: (record: TRecordWithChildrenOrCount) => void;
  handleUpdate: (record: TRecordWithChildrenOrCount) => void;
}

export function RecordItem(props: TRecordItemProps) {
  const t = useTranslations('RecordItem');
  const user = useSessionUser();
  const { record, isUpdating: isParentUpdating, handleUpdate, handleDelete } = props;
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

  const handleUpdatedChildRecords = React.useCallback((records: TRecordWithChildrenOrCount[]) => {
    setChildren(records);
  }, []);

  const handleLoadChildrenForParent = React.useCallback(
    (parentId: TFetchParentId) => {
      return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
        startUpdating(async () => {
          try {
            const fetchedRecords = await fetchRecordsByParentWithChildrenCount({
              parentId,
              userId: user?.id || null,
            });
            setChildren(fetchedRecords);
            toast.success(t('records-has-been-loaded'));
            resolve(fetchedRecords);
          } catch (error) {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordItem:handleLoadChildrenForParent]', description, {
              error,
            });
            debugger; // eslint-disable-line no-debugger
            const nextMsg = t('error-loading-children-records');
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
    [t, user],
  );

  const addChildRecord = React.useCallback(
    (newRecord: TNewRecord) => {
      return new Promise<Awaited<ReturnType<typeof addRecord>>>((resolve, reject) => {
        startUpdating(async () => {
          try {
            const userId = user?.id || null; // Current user id
            const newRecordWithUser = {
              ...newRecord,
              userId,
            };
            const promises = [
              // Add record...
              addRecord(newRecordWithUser),
              // Fetch records if hasn't been fetched yet...
              !childrenRecords
                ? fetchRecordsByParentWithChildrenCount({
                    parentId: record.id,
                    userId: user?.id || null,
                  })
                : undefined,
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
            toast.success(t('record-successfully-added'));
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
            const nextMsg = t('error-adding-record');
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
    [childrenRecords, record, t, user],
  );

  const editThisRecord = React.useCallback(
    (record: TRecord) => {
      return new Promise<Awaited<ReturnType<typeof updateRecord>>>((resolve, reject) => {
        startUpdating(async () => {
          try {
            const updatedRecord = await updateRecord(record);
            handleUpdate(updatedRecord);
            toast.success(t('record-has-been-successfully-updated'));
            resolve(updatedRecord);
            // revalidatePage();
          } catch (error) {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordItem:onEditRecord]', description, {
              error,
            });
            debugger; // eslint-disable-line no-debugger
            const nextMsg = t('error-editing-record');
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
    [handleUpdate, t],
  );

  const { invokeEditRecordModal, editRecordModalElement } = useEditRecordModal({
    onEditRecord: editThisRecord,
    onAddRecord: addChildRecord,
  });

  return (
    <div
      // ...
      className={cn(
        isDev && '__RecordItem', // DEBUG
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
        handleAdd={invokeEditRecordModal}
        handleEdit={invokeEditRecordModal}
      />
      <RecordChildren
        parentId={record.id}
        childrenRecords={childrenRecords}
        isOpen={isOpen}
        handleUpdatedRecords={handleUpdatedChildRecords}
        isUpdating={isUpdating || isParentUpdating}
      />
      {editRecordModalElement}
    </div>
  );
}
