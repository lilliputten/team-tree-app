'use client';

import React from 'react';

import { TRecord, TRecordId } from '@/features/records/types';

import { ConfirmDeleteRecordModal } from './ConfirmDeleteRecordModal';

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
