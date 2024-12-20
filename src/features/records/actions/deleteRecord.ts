'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecordId } from '@/features/records/types';

export type TDeleteRecordAction = typeof deleteRecord;

export async function deleteRecord(recordId: TRecordId) {
  try {
    const removedRecord = await prisma.record.delete({
      where: {
        id: recordId,
      },
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return removedRecord;
  } catch (error) {
    const nextText = 'Error deleting record';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.error('[deleteRecord]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
