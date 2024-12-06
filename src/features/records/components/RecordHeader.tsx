import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { isDev } from '@/constants';

import { TGenericFetchRecordsByParent, TRecordId, TRecordWithChildrenOrCount } from '../types';

interface TRecordHeaderProps {
  record: TRecordWithChildrenOrCount;
  childrenRecords?: TRecordWithChildrenOrCount[];
  isOpen?: boolean;
  hasLoaded?: boolean;
  isUpdating?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleLoadChildrenForParent: TGenericFetchRecordsByParent;
  handleDelete: (record: TRecordWithChildrenOrCount) => void;
  handleAdd: (parentId: TRecordId | null) => void;
}

export function RecordHeader(props: TRecordHeaderProps) {
  const {
    // Data...
    record,
    childrenRecords,
    // TODO: Use these for styles
    isOpen,
    hasLoaded,
    // Actions...
    handleOpen,
    handleClose,
    handleLoadChildrenForParent,
    isUpdating,
    handleDelete,
    handleAdd,
  } = props;
  // const isUpdating = true;
  const {
    id,
    name,
    _count, // : { children: childrenCount },
  } = record;
  const childrenCount = childrenRecords ? childrenRecords.length : _count ? _count.children : 0;
  const hasChildren = !!childrenCount;
  const hasToggleAction = !isUpdating && hasChildren;
  /** No children or they've already been loaded */
  const isStable = hasLoaded || !childrenCount;
  const onClick = React.useCallback(() => {
    if (!hasChildren) {
      return;
    }
    if (!hasLoaded) {
      handleLoadChildrenForParent(id);
    }
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [hasChildren, hasLoaded, isOpen, handleLoadChildrenForParent, id, handleClose, handleOpen]);
  const toggleItem = React.useMemo(() => {
    if (!hasChildren) {
      return null;
    }
    if (hasChildren) {
      // const debugChildrenFlag = isOpen ? '[-]' : '[+]';
      const Icon = isUpdating ? Icons.spinner : isOpen ? Icons.remove : Icons.add;
      return (
        <div
          className={cn(
            '__RecordHeader_Toggle', // DEBUG
            'transition-all duration-500',
            'relative',
            // 'size-8',
            hasToggleAction && 'cursor-pointer',
            !hasToggleAction && 'opacity-50',
            !hasToggleAction && 'cursor-not-allowed',
            !hasToggleAction && 'pointer-events-none',
            // 'max-sm:hidden',
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              '__RecordHeader_IconWrapper', // DEBUG
              'transition-all',
              'size-6',
              'm-2',
              'overflow-hidden',
              'bg-accent/20',
              'opacity-50',
              'text-foreground',
              'rounded border border-gray-400/30',
              'hover:bg-blue-300/20',
              'active:bg-blue-300',
              'active:text-blue-100',
              'hover:opacity-80',
              'hover:border-blue-400/40',
              'hover:text-blue-500/80',
              'flex flex-row items-center justify-center',
              isUpdating && 'border-transparent',
            )}
          >
            <Icon
              className={cn(
                '__RecordHeader_TogleIcon', // DEBUG
                'size-4',
                'overflow-hidden',
                isUpdating && 'animate-spin',
              )}
            />
          </div>
        </div>
      );
    } else {
      return <> </>;
    }
  }, [onClick, hasChildren, isOpen, isUpdating, hasToggleAction]);
  const loadingIcon = React.useMemo(() => {
    return (
      <Icons.dot
        className={cn(
          '__RecordHeader_LoadedIcon', // DEBUG
          'size-8',
          'transition-all duration-1000',
          'text-gray-500/10',
          'max-sm:hidden',
          isUpdating && 'animate-pulse text-red-500',
          isStable && 'text-green-500',
        )}
      />
    );
  }, [isStable, isUpdating]);
  const rightIcons = React.useMemo(() => {
    return (
      <>
        <Button
          title="Edit record name"
          data-button-id="edit"
          variant="ghostBlue"
          className="text-blue-500 hover:bg-blue-400/10 hover:text-blue-700 active:bg-blue-500 active:text-blue-100"
          size="icon"
          disabled
        >
          <Icons.edit className="size-5" />
        </Button>
        <Button
          title="Add new record under this one"
          data-button-id="add"
          variant="ghostBlue"
          className="text-green-500 hover:bg-green-400/10 hover:text-green-700 active:bg-green-500 active:text-green-100"
          size="icon"
          onClick={() => handleAdd(record.id)}
        >
          <Icons.add className="size-7" />
        </Button>
        <Button
          title="Remove the record and all its children"
          data-button-id="remove"
          variant="ghostBlue"
          className="text-red-500 hover:bg-red-400/10 hover:text-red-700 active:bg-red-500 active:text-red-100"
          size="icon"
          onClick={() => handleDelete(record)}
        >
          <Icons.trash className="size-5" />
        </Button>
      </>
    );
  }, [handleDelete, handleAdd, record]);
  return (
    <div
      className={cn(
        '__RecordHeader', // DEBUG
        'flex flex-row items-start gap-2 gap-y-0',
        'max-sm:flex-col-reverse',
        'rounded',
        'px-2',
        'py-1',
        isUpdating && 'opacity-50',
        isUpdating && 'cursor-not-allowed',
        isUpdating && 'pointer-events-none',
        'transition-all',
        isOpen && 'bg-blue-400/10',
      )}
      data-record-id={id}
    >
      <div
        className={cn(
          '__RecordHeader_LeftTextAndIcons', // DEBUG
          'flex flex-1 flex-row items-start gap-2',
        )}
      >
        <div
          className={cn(
            '__RecordHeader_LeftIcons', // DEBUG
            'flex flex-row items-center gap-0',
            'min-h-10',
          )}
        >
          {loadingIcon}
          {toggleItem}
        </div>
        <div
          className={cn(
            '__RecordHeader_Text', // DEBUG
            'flex flex-1 flex-row items-center gap-2 py-2',
            'overflow-hidden',
            'select-none',
            hasToggleAction && 'cursor-pointer',
          )}
          onClick={onClick}
        >
          <span
            className={cn(
              '__RecordHeader_TextContent', // DEBUG
              'overflow-hidden text-ellipsis',
              // 'whitespace-nowrap', // NOTE: It's possible to use one-line mode
            )}
          >
            {isDev && <span className="opacity-20">[{id}]</span>} {name}
          </span>
        </div>
      </div>
      <div
        className={cn(
          '__RecordHeader_RightIcons', // DEBUG
          'flex flex-row items-center gap-0 py-0',
          isUpdating && 'opacity-50',
          isUpdating && 'cursor-not-allowed',
          isUpdating && 'pointer-events-none',
          'justify-end',
          // 'max-sm:w-full', // NOTE: Align controls to the right on small screens
        )}
      >
        {rightIcons}
      </div>
    </div>
  );
}
