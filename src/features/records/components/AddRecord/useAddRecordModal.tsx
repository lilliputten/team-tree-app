import React from 'react';

import { TRecordId, TRecordWithChildrenOrCount, TRecordWithoutId } from '@/features/records/types';

import { TAddRecordFormData } from './AddRecordBlock';
import { AddRecordModal } from './AddRecordModal';

interface TUseAddRecordModalProps {
  onAddRecord: (record: TRecordWithoutId) => Promise<TRecordWithChildrenOrCount>;
}

export function useAddRecordModal(props: TUseAddRecordModalProps) {
  const { onAddRecord } = props;
  const [show, toggle] = React.useState(false);
  const [parentId, setParentId] = React.useState<TRecordId | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const invokeAddRecordModal = React.useCallback((parentId: TRecordId | null) => {
    setParentId(parentId);
    toggle(true);
  }, []);
  const hideAddRecordModal = React.useCallback(() => toggle(false), []);

  const onSubmit = React.useCallback(
    (formData: TAddRecordFormData) => {
      return new Promise<Awaited<ReturnType<typeof onAddRecord>>>((resolve, reject) => {
        startTransition(async () => {
          const newRecord: TRecordWithoutId = { parentId, ...formData };
          onAddRecord(newRecord)
            .then((addedRecord) => {
              toggle(false);
              resolve(addedRecord);
            })
            .catch(reject);
        });
      });
    },
    [onAddRecord, parentId],
  );

  const addRecordModalElement = React.useMemo(() => {
    return (
      <AddRecordModal
        show={show}
        toggle={toggle}
        parentId={parentId}
        onSubmit={onSubmit}
        onCancel={hideAddRecordModal}
        isPending={isPending}
      />
    );
  }, [hideAddRecordModal, isPending, parentId, onSubmit, show]);

  return React.useMemo(
    () => ({
      isShown: show,
      addRecordModalElement,
      invokeAddRecordModal,
      hideAddRecordModal,
      toggleShowAddRecordModal: toggle,
    }),
    [
      // prettier-ignore
      show,
      addRecordModalElement,
      invokeAddRecordModal,
      hideAddRecordModal,
    ],
  );
}
