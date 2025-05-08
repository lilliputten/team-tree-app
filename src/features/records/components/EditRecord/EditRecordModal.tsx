import React from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { isDev } from '@/constants';
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
  const t = useTranslations('EditRecordModal');
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
        isDev && '__EditRecordModal', // DEBUG
        !isMobile && 'max-h-[90vh]',
        'flex flex-col gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          isDev && '__EditRecordModal_Header', // DEBUG
          'flex flex-col border-b bg-accent px-8 py-4',
        )}
      >
        <DialogTitle className="DialogTitle">
          {isExistingRecord ? t('edit-record') : t('create-record')}
        </DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          {isExistingRecord ? t('edit-record-dialog') : t('create-record-dialog')}
        </DialogDescription>
      </div>
      <div
        className={cn(
          isDev && '__EditRecordModal__Content', // DEBUG
          'flex flex-1 flex-col',
        )}
      >
        <EditRecordBlock
          className={cn(
            isDev && '__EditRecordModal__ContentBlock', // DEBUG
            'p-8',
          )}
          {...restProps}
        />
      </div>
    </Modal>
  );
}
