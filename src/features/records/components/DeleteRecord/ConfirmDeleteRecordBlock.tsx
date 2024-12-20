'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { TRecord, TRecordId } from '@/features/records/types';

export interface TConfirmDeleteRecordBlockProps {
  record: TRecord;
  onConfirm: (recordId: TRecordId) => void;
  onCancel?: () => void;
  className?: string;
  isPending?: boolean;
}

export function ConfirmDeleteRecordBlock(props: TConfirmDeleteRecordBlockProps) {
  const {
    // prettier-ignore
    className,
    record,
    onConfirm,
    onCancel,
    isPending,
  } = props;
  const { id, name } = record;
  const submitRef = React.useRef<HTMLButtonElement>(null);
  const isSubmitEnabled = !isPending; // && isDirty && isValid;
  // Focus the first field (should it be used with a languages list?)
  React.useEffect(() => {
    submitRef.current?.focus();
  }, [submitRef]);
  return (
    <div className={cn(className, '__ConfirmDeleteRecordBlock', 'my-4 flex flex-col gap-6')}>
      <p className="Text">Delete the record "{name}"?</p>
      <div className="flex w-full gap-4">
        <Button
          type="submit"
          ref={submitRef}
          variant={isSubmitEnabled ? 'default' : 'disable'}
          disabled={!isSubmitEnabled}
          onClick={() => onConfirm(id)}
        >
          {isPending ? <Icons.spinner className="size-4 animate-spin" /> : <span>Delete</span>}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
}
