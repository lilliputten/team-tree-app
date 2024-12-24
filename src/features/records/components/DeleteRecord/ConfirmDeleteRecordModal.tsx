'use client';

import React from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { DialogDescription } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TRecord, TRecordId } from '@/features/records/types';

import { ConfirmDeleteRecordBlock } from './ConfirmDeleteRecordBlock';

interface TConfirmDeleteRecordModalProps /* extends TConfirmDeleteRecordBlockProps */ {
  record?: TRecord;
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (id: TRecordId) => void; // Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

export function ConfirmDeleteRecordModal(props: TConfirmDeleteRecordModalProps) {
  const t = useTranslations('ConfirmDeleteRecordModal');
  const {
    // prettier-ignore
    show,
    toggle,
    onConfirm,
    onCancel,
    record,
    isPending,
  } = props;
  return (
    <Modal
      showModal={show}
      setShowModal={toggle}
      className={cn(
        // prettier-ignore
        'gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          'flex flex-col border-b bg-accent px-8 py-4',
          // isPending && 'pointer-events-none opacity-50',
        )}
      >
        <DialogTitle className="DialogTitle">{t('delete-record')}</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          {t('delete-record-dialog')}
        </DialogDescription>
      </div>
      <div
        className={cn(
          // prettier-ignore
          'flex flex-col px-8 py-4',
          // isPending && 'pointer-events-none opacity-50',
        )}
      >
        {!!record && (
          <ConfirmDeleteRecordBlock
            onConfirm={onConfirm}
            onCancel={onCancel}
            record={record}
            isPending={isPending}
          />
        )}
      </div>
    </Modal>
  );
}
