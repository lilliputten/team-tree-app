'use client';

import React from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { DialogDescription } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TRecord, TRecordId } from '@/features/records/types';

import { ConfirmDeleteRecordBlock } from './ConfirmDeleteRecordBlock';

interface TConfirmDeleteRecordModalProps /* extends TConfirmDeleteRecordBlockProps */ {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  record?: TRecord;
  onConfirm: (id: TRecordId) => void; // Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

function ConfirmDeleteRecordModal(props: TConfirmDeleteRecordModalProps) {
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
        <DialogTitle className="DialogTitle">Delete record</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Delete record dialog
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

interface TConfirmDeleteRecordModalParams {
  onDeleteRecord: (id: TRecordId) => Promise<unknown>;
}

export function useConfirmDeleteRecordModal(params: TConfirmDeleteRecordModalParams) {
  const { onDeleteRecord } = params;
  const [show, toggle] = React.useState(false);
  const [isPending, setPending] = React.useState(false);
  const [record, setRecord] = React.useState<TRecord>();

  // const showConfirmDeleteRecordModal = React.useCallback(() => toggle(true), []);
  const hideConfirmDeleteRecordModal = React.useCallback(() => toggle(false), []);
  const invokeConfirmDeleteRecordModal = React.useCallback((record: TRecord) => {
    setRecord(record);
    toggle(true);
  }, []);

  const handleConfirm = React.useCallback(
    (recordId: TRecordId) => {
      setPending(true);
      onDeleteRecord(recordId)
        // Close the modal on finish
        .then(() => {
          toggle(false);
        })
        // NOTE: Keeping this catch to avoid uncaught exceptions
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[ConfirmDeleteRecordModal:handleConfirm] caught', error);
          debugger; // eslint-disable-line no-debugger
        })
        .finally(() => {
          setPending(false);
        });
    },
    [onDeleteRecord, toggle],
  );

  const confirmDeleteRecordModalElement = React.useMemo(() => {
    return (
      <ConfirmDeleteRecordModal
        show={show}
        toggle={toggle}
        record={record}
        onConfirm={handleConfirm}
        onCancel={hideConfirmDeleteRecordModal}
        isPending={isPending}
      />
    );
  }, [record, handleConfirm, show, hideConfirmDeleteRecordModal, isPending]);

  return React.useMemo(
    () => ({
      isShown: show,
      confirmDeleteRecordModalElement,
      hideConfirmDeleteRecordModal,
      toggleShowConfirmDeleteRecordModal: toggle,
      invokeConfirmDeleteRecordModal,
    }),
    [
      show,
      confirmDeleteRecordModalElement,
      hideConfirmDeleteRecordModal,
      invokeConfirmDeleteRecordModal,
    ],
  );
}
