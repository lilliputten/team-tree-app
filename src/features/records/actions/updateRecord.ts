'use server';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TRecord, TRecordWithChildrenOrCount } from '@/features/records/types';

export type TEditRecordAction = typeof updateRecord;

// @see:
// - https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1
// - https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
// - https://www.prisma.io/docs/orm/prisma-client/queries
// - https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function updateRecord(record: TRecordWithChildrenOrCount) {
  try {
    const { id, name, parentId } = record;
    const recordData: TRecord = { id, name, parentId };
    const editedRecord = await prisma.record.update({
      where: {
        id: record.id,
      },
      data: recordData,
      include: { _count: { select: { children: true } } },
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 1000));
     */
    return editedRecord as TRecordWithChildrenOrCount;
  } catch (error) {
    const nextText = 'Error editing record';
    const errorMessage = getErrorText(error);
    const nextMessage = [nextText, errorMessage].filter(Boolean).join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.error('[updateRecord]', nextMessage, {
      nextError,
      errorMessage,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw nextError;
  }
}
