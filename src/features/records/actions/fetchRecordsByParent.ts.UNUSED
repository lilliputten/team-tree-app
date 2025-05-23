'use server';

import { Prisma } from '@prisma/client';

import { DatabaseError } from '@/shared/types/errors';
import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';
import { TFetchParentId, TRecord } from '@/features/records/types';
import { TOptionalUserId } from '@/features/users/types/TUser';

export interface TFetchRecordsByParentParams {
  parentId?: TFetchParentId;
  userId?: TOptionalUserId;
}

/** Find chidlren records.
 * Will find children records for `parentId={VALUE}`.
 * Will find only root records for `parentId=null`.
 * Will find all the records records for `parentId=undefined`.
 * Will find all the records belonged to the user if `userId={VALUE}`.
 * Will find all the 'orphan' (without owner) records if `userId=null`.
 * Will find all the records if `userId=undefined`.
 * @param {object} params
 * @param {number|null|undefined} [params.parentId]
 * @param {string|null|undefined} [params.userId]
 */
export async function fetchRecordsByParent(params: TFetchRecordsByParentParams = {}) {
  const { parentId = null, userId } = params;
  const where: Prisma.RecordFindManyArgs['where'] = {
    parentId: parentId,
  };
  if (userId !== undefined) {
    where.userId = userId;
  }
  try {
    const records: TRecord[] = await prisma.record.findMany({
      where,
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
