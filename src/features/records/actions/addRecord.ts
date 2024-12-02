'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecord, TRecordWithoutId } from '@/features/records/types';

export type TAddRecordAction = typeof addRecord;

// @see:
// - https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1
// - https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
// - https://www.prisma.io/docs/orm/prisma-client/queries
// - https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function addRecord(record: TRecordWithoutId) {
  try {
    const addedRecord = await prisma.record.create({
      data: record,
    });
    /* console.log('[addRecord] done', {
     *   record,
     *   addedRecord,
     * });
     */
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return addedRecord as TRecord;
  } catch (error) {
    const nextText = 'Error adding record';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    // eslint-disable-next-line no-console
    console.error('[addRecord]', nextMessage, {
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw new DatabaseError(nextMessage);
  }
}
