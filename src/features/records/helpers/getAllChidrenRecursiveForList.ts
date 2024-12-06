'use server';

import { prisma } from '@/lib/db';
import { TRecord, TRecordId } from '@/features/records/types';

export async function getAllChidrenRecursiveForList(parentIds: TRecordId[]) {
  const records = await prisma.record.findMany({
    where: {
      parentId: { in: parentIds },
    },
    include: { children: true },
  });
  // Add second-level records (from the direct results of the initial request)...
  const foundRecords = [...(records as TRecord[])];
  const promises = records.flatMap(({ children }) => {
    // Add third-level records (from the extended details of the initial request)...
    foundRecords.push(...children);
    const subPromise = getAllChidrenRecursiveForList(children.map(({ id }) => id));
    return subPromise;
  });
  // Resolve delayed promises...
  const resolvedLists = await Promise.all(promises);
  resolvedLists.forEach((records) => {
    if (records.length) {
      foundRecords.push(...records);
    }
  });
  return foundRecords;
}
