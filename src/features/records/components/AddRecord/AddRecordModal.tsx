import React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TRecordId } from '@/features/records/types';

import { AddRecordBlock, TAddRecordFormData } from './AddRecordBlock';

interface TAddRecordModalProps {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  parentId: TRecordId | null;
  onSubmit: (formData: TAddRecordFormData) => Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

export function AddRecordModal(props: TAddRecordModalProps) {
  const { show, toggle, ...restProps } = props;
  const { isPending } = restProps;
  const { isMobile } = useMediaQuery();

  return (
    <Modal
      showModal={show}
      setShowModal={toggle}
      className={cn(
        '__AddRecordModal', // DEBUG
        !isMobile && 'max-h-[90vh]',
        'flex flex-col gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          '__AddRecordModal_Header', // DEBUG
          'flex flex-col border-b bg-accent px-8 py-4',
        )}
      >
        <DialogTitle className="DialogTitle">Add Record</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Add record dialog
        </DialogDescription>
      </div>
      <div
        className={cn(
          '__AddRecordModal__Content', // DEBUG
          'flex flex-1 flex-col',
        )}
      >
        <AddRecordBlock
          className={cn(
            '__AddRecordModal__ContentBlock', // DEBUG
            'p-8',
          )}
          {...restProps}
        />
      </div>
    </Modal>
  );
}
