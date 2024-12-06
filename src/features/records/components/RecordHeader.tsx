import React from 'react';

import { cn } from '@/lib/utils';

import { TGenericFetchRecordsByParent, TRecordWithChildrenOrCount } from '../types';

interface TRecordHeaderProps {
  record: TRecordWithChildrenOrCount;
  childrenRecords?: TRecordWithChildrenOrCount[];
  isOpen?: boolean;
  hasLoaded?: boolean;
  isUpdating?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleLoadChildrenForParent: TGenericFetchRecordsByParent;
}

export function RecordHeader(props: TRecordHeaderProps) {
  const {
    // Data...
    record,
    childrenRecords,
    // TODO: Use these for styles
    isOpen,
    hasLoaded,
    isUpdating,
    // Actions...
    handleOpen,
    handleClose,
    handleLoadChildrenForParent,
  } = props;
  const {
    id,
    name,
    _count, // : { children: childrenCount },
  } = record;
  const childrenCount = childrenRecords ? childrenRecords.length : _count ? _count.children : 0;
  const hasChildren = !!childrenCount;
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
  const treeItem = React.useMemo(() => {
    if (hasChildren) {
      const debugChildrenFlag = isOpen ? '[-]' : '[+]';
      return <span onClick={onClick}>{debugChildrenFlag}</span>;
    } else {
      return <>[ ]</>;
    }
  }, [onClick, hasChildren, isOpen]);
  return (
    <div
      className={cn(
        '__RecordHeader', // DEBUG
      )}
      data-record-id={id}
    >
      {hasLoaded ? 'OK ' : '? '}
      {isUpdating && '(...) '}
      {treeItem} {id} {name}
    </div>
  );
}
