'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';
import { useSessionUser } from '@/hooks/useSessionUser';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Icons } from '@/components/shared/icons';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { isDev } from '@/constants';
import { TRecordWithChildrenOrCount, TRecordWithoutIds } from '@/features/records/types';

import { addRecord, fetchRecordsByParentWithChildrenCount } from '../actions';
import { useEditRecordModal } from './EditRecord';
import { RecordChildren } from './RecordChildren';
import { RecordsListHeader } from './RecordsListHeader';

interface TRecordsListProps extends TPropsWithClassName {
  initialRecords: TRecordWithChildrenOrCount[];
}

export function RecordsList(props: TRecordsListProps) {
  const t = useTranslations('RecordsList');
  const user = useSessionUser();
  const { className, initialRecords } = props;
  const [isUpdating, startUpdating] = React.useTransition();
  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    initialRecords,
  );
  React.useEffect(() => setChildren(initialRecords), [initialRecords]);
  const hasRecords = !!childrenRecords?.length;

  const handleUpdatedRecords = React.useCallback((records: TRecordWithChildrenOrCount[]) => {
    setChildren(records);
  }, []);

  const onReloadRecords = React.useCallback(() => {
    return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
      startUpdating(async () => {
        try {
          const records = await fetchRecordsByParentWithChildrenCount();
          setChildren(records);
          toast.success(t('records-data-has-been-successfully-reloaded'));
          resolve(records);
        } catch (error) {
          const description = getErrorText(error);
          // eslint-disable-next-line no-console
          console.error('[RecordsList:onReloadRecords]', description, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          const nextMsg = t('error-reloading-data');
          const nextError = new Error(nextMsg);
          toast.error(nextMsg, {
            description,
          });
          // Re-throw?
          reject(nextError);
        }
      });
    });
  }, [t]);

  const onAddRootRecord = React.useCallback(
    (newRecord: TRecordWithoutIds) => {
      return new Promise<Awaited<ReturnType<typeof addRecord>>>((resolve, reject) => {
        startUpdating(async () => {
          try {
            const userId = user?.id || null; // Current user id
            const newRecordWithUser = {
              ...newRecord,
              userId,
            };
            const addedRecord = await addRecord(newRecordWithUser);
            setChildren((records) => {
              return records ? records.concat(addedRecord) : [addedRecord];
            });
            toast.success(t('record-successfully-added'));
            resolve(addedRecord);
          } catch (error) {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordsList:onAddRootRecord]', description, {
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
    [t, user],
  );

  const { invokeEditRecordModal, editRecordModalElement } = useEditRecordModal({
    onAddRecord: onAddRootRecord,
  });

  const addRootRecord = React.useCallback(() => {
    invokeEditRecordModal({ name: '', parentId: null });
  }, [invokeEditRecordModal]);

  return (
    <div
      className={cn(
        isDev && '__RecordsList', // DEBUG
        className,
        'flex flex-col items-center',
        'layout-follow',
      )}
    >
      <div
        className={cn(
          isDev && '__RecordsList_HeaderWrapper', // DEBUG
          'flex w-full flex-col',
          'm-auto',
          'bg-gray-400/20',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            isDev && '__RecordsList_HeaderContainer', // DEBUG
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
          isDev && '__RecordsList_Scroll', // DEBUG
          className,
          'flex flex-col items-center',
          'justify-center',
          'layout-follow',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            isDev && '__RecordsList_Container', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
            'my-3',
            isUpdating && 'opacity-50',
            isUpdating && 'cursor-not-allowed',
            isUpdating && 'pointer-events-none',
            'transition-all',
          )}
        >
          {hasRecords ? (
            <RecordChildren
              className={cn(
                isDev && '__RecordsList_ContainerChildren', // DEBUG
              )}
              childrenRecords={childrenRecords}
              handleUpdatedRecords={handleUpdatedRecords}
              // isUpdating={isUpdating}
            />
          ) : (
            <div
              className={cn(
                isDev && '__RecordsList_ContainerChildrenEmpty', // DEBUG
                'm-auto',
                'p-4',
                'flex flex-col items-center gap-4',
              )}
            >
              <p>{t('no-items-have-been-created-yet')}</p>
              <p>
                <Button
                  title={t('add-new-top-level-record')}
                  data-button-id="add"
                  variant="ghostBlue"
                  className="flex gap-2 text-green-500 hover:bg-green-400/10 hover:text-green-700 active:bg-green-500 active:text-green-100"
                  onClick={addRootRecord}
                >
                  <Icons.add className="size-5" />
                  <span>{t('add-new-record')}</span>
                </Button>
              </p>
            </div>
          )}
        </MaxWidthWrapper>
      </ScrollArea>
      {editRecordModalElement}
    </div>
  );
}
