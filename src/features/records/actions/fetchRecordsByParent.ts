'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TFetchParentId, TRecord } from '@/features/records/types';

export async function fetchRecordsByParent(parentId: TFetchParentId) {
  try {
    const records: TRecord[] = await prisma.record.findMany({
      where: {
        parentId: parentId,
      },
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return records;
  } catch (error) {
    const nextText = 'Error fetching records';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.error('[fetchRecordsByParent]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
