'use client';

import React from 'react';
import { toast } from 'sonner';

import { getErrorText } from '@/lib/helpers/strings';
import { cn } from '@/lib/utils';

import { fetchRecordsByParentWithChildrenCount } from '../actions';
import { TFetchParentId, TRecordWithChildrenOrCount } from '../types';
import { RecordChildren } from './RecordChildren';
import { RecordHeader } from './RecordHeader';

interface TRecordItemProps {
  record: TRecordWithChildrenOrCount;
  isUpdating?: boolean;
  // childrenRecords?: TRecordWithChildrenOrCount[];
}

export function RecordItem(props: TRecordItemProps) {
  const {
    // ...
    record,
    isUpdating: isParentUpdating,
  } = props;
  const {
    id,
    // name,
    // _count, // : { children: childrenCount },
    children: initialChildren, // NOTE: Allow to use pre-fetched children data
  } = record;
  const [isUpdating, startUpdating] = React.useTransition();
  const [childrenRecords, setChildren] = React.useState<TRecordWithChildrenOrCount[] | undefined>(
    initialChildren,
  );
  // const childrenCount = childrenRecords ? childrenRecords.length : _count ? _count.children : 0;
  // const hasChildren = !!childrenCount;
  const hasLoaded = childrenRecords != undefined;
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);

  /* // Effect: Initial state
   * React.useEffect(() => {
   *   console.log('[RecordItem] Effect: Initial state', {
   *     hasLoaded,
   *     initialChildren,
   *     childrenRecords,
   *     record,
   *   });
   * }, [hasLoaded, initialChildren, record, childrenRecords]);
   */

  const handleLoadChildrenForParent = React.useCallback((parentId: TFetchParentId) => {
    // if (memo.isUpdating) {
    //   throw new Error('The data is currently being updated');
    // }
    return new Promise<TRecordWithChildrenOrCount[]>((resolve, reject) => {
      startUpdating(() => {
        /* console.log('[RecordItem:handleLoadChildrenForParent]', {
         *   parentId,
         * });
         */
        return fetchRecordsByParentWithChildrenCount(parentId)
          .then((fetchedRecords: TRecordWithChildrenOrCount[]) => {
            /* console.log('[RecordItem:handleLoadChildrenForParent] done', {
             *   fetchedRecords,
             *   parentId,
             * });
             */
            setChildren(fetchedRecords);
            toast.success('Records has been loaded');
            resolve(fetchedRecords);
          })
          .catch((error) => {
            const description = getErrorText(error);
            // eslint-disable-next-line no-console
            console.error('[RecordItem:handleLoadChildrenForParent]', description, {
              error,
            });
            debugger; // eslint-disable-line no-debugger
            const nextMsg = 'Error loading children records';
            const nextError = new Error(nextMsg);
            // TODO: To show message here?
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
      // ...
      className={cn(
        '__RecordItem', // DEBUG
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
      />
      <RecordChildren
        record={record}
        childrenRecords={childrenRecords}
        isOpen={isOpen}
        isUpdating={isUpdating || isParentUpdating}
        hasLoaded={hasLoaded}
      />
    </div>
  );
}
