import React from 'react';

import {
  TNewOrExistingRecord,
  TNewRecord,
  TRecord,
  TRecordWithChildrenOrCount,
} from '@/features/records/types';

import { TEditRecordFormData } from './EditRecordBlock';
import { EditRecordModal } from './EditRecordModal';

interface TUseEditRecordModalProps {
  onEditRecord: (record: TRecord) => Promise<TRecordWithChildrenOrCount>;
  onAddRecord: (record: TNewRecord) => Promise<TRecordWithChildrenOrCount>;
}

export function useEditRecordModal(props: TUseEditRecordModalProps) {
  const { onEditRecord, onAddRecord } = props;
  const [show, toggle] = React.useState(false);
  const [record, setRecord] = React.useState<TNewOrExistingRecord | undefined>();
  const [isPending, startTransition] = React.useTransition();

  const invokeEditRecordModal = React.useCallback((record: TNewOrExistingRecord) => {
    setRecord(record);
    toggle(true);
  }, []);
  const hideEditRecordModal = React.useCallback(() => toggle(false), []);

  const onSubmit = React.useCallback(
    (formData: TEditRecordFormData) => {
      return new Promise<Awaited<ReturnType<typeof onEditRecord>>>((resolve, reject) => {
        startTransition(async () => {
          if (!record) {
            // TODO: Switch to add mode then?
            throw new Error('The record should be defined in order to edit it');
          }
          const updatedRecord: TNewOrExistingRecord = { ...record, ...formData };
          const promise = updatedRecord.id
            ? onEditRecord(updatedRecord as TRecord)
            : onAddRecord(updatedRecord);
          promise
            .then((updatedRecord) => {
              toggle(false);
              resolve(updatedRecord);
            })
            .catch(reject);
        });
      });
    },
    [onEditRecord, onAddRecord, record],
  );

  const editRecordModalElement = React.useMemo(() => {
    return (
      <EditRecordModal
        show={show}
        toggle={toggle}
        record={record}
        onSubmit={onSubmit}
        onCancel={hideEditRecordModal}
        isPending={isPending}
      />
    );
  }, [hideEditRecordModal, isPending, onSubmit, record, show]);

  return React.useMemo(
    () => ({
      isShown: show,
      editRecordModalElement,
      invokeEditRecordModal,
      hideEditRecordModal,
      toggleShowEditRecordModal: toggle,
    }),
    [
      // prettier-ignore
      show,
      editRecordModalElement,
      invokeEditRecordModal,
      hideEditRecordModal,
    ],
  );
}
