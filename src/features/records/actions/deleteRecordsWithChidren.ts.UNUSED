'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecordId } from '@/features/records/types';

import { getAllChidrenRecursiveForList } from '../helpers';

export type TDeleteRecordWithChidrenAction = typeof deleteRecordsWithChidren;

export async function deleteRecordsWithChidren(recordIds: TRecordId[]) {
  try {
    const childrenRecords = await getAllChidrenRecursiveForList(recordIds);
    const allRecordIds = recordIds.concat(childrenRecords.map(({ id }) => id));
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
    console.error('[deleteRecordsWithChidren]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
