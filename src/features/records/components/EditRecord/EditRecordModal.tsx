import React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TNewOrExistingRecord } from '@/features/records/types';

import { EditRecordBlock, TEditRecordFormData } from './EditRecordBlock';

interface TEditRecordModalProps {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  record?: TNewOrExistingRecord;
  onSubmit: (formData: TEditRecordFormData) => Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

export function EditRecordModal(props: TEditRecordModalProps) {
  const { show, toggle, ...restProps } = props;
  const { record } = restProps;
  const { isPending } = restProps;
  const { isMobile } = useMediaQuery();

  const isExistingRecord = !!record?.id;

  return (
    <Modal
      showModal={show}
      setShowModal={toggle}
      className={cn(
        '__EditRecordModal', // DEBUG
        !isMobile && 'max-h-[90vh]',
        'flex flex-col gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          '__EditRecordModal_Header', // DEBUG
          'flex flex-col border-b bg-accent px-8 py-4',
        )}
      >
        <DialogTitle className="DialogTitle">
          {isExistingRecord ? 'Edit' : 'Create'} Record
        </DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          {isExistingRecord ? 'Edit' : 'Create'} record dialog
        </DialogDescription>
      </div>
      <div
        className={cn(
          '__EditRecordModal__Content', // DEBUG
          'flex flex-1 flex-col',
        )}
      >
        <EditRecordBlock
          className={cn(
            '__EditRecordModal__ContentBlock', // DEBUG
            'p-8',
          )}
          {...restProps}
        />
      </div>
    </Modal>
  );
}
