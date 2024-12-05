'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecordId } from '@/features/records/types';

import { getAllChidrenRecursive } from '../helpers';

export type TDeleteRecordWithChidrenAction = typeof deleteRecordWithChidren;

export async function deleteRecordWithChidren(recordId: TRecordId) {
  try {
    const allRecords = await getAllChidrenRecursive(recordId);
    const allRecordIds = [recordId].concat(allRecords.map(({ id }) => id).concat(recordId));
    const deleteResult = await prisma.record.deleteMany({
      where: {
        id: { in: allRecordIds },
      },
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return deleteResult;
  } catch (error) {
    const nextText = 'Error deleting record with children';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.error('[deleteRecordWithChidren]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
