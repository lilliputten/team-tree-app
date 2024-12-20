'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecordId } from '@/features/records/types';

export type TDeleteRecordsAction = typeof deleteRecords;

export async function deleteRecords(recordIds: TRecordId[]) {
  try {
    const result = await prisma.record.deleteMany({
      where: {
        id: { in: recordIds },
      },
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return result;
  } catch (error) {
    const nextText = 'Error deleting records';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.error('[deleteRecords]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
