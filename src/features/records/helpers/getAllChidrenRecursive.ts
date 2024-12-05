'use server';

import { prisma } from '@/lib/db';
import { TRecord, TRecordId } from '@/features/records/types';

export async function getAllChidrenRecursive(parentId: TRecordId | null) {
  const records = await prisma.record.findMany({
    where: {
      parentId: parentId,
    },
    include: { children: true },
  });
  // Add second-level records (from the direct results of the initial request)...
  const foundRecords = [...(records as TRecord[])];
  const promises = records.flatMap(({ /* id: currentId, */ children }) => {
    // Add third-level records (from the extended details of the initial request)...
    foundRecords.push(...children);
    const subPromises = children.map(({ id }) => {
      // Add more deeper results recursively (as delayed promises)...
      return getAllChidrenRecursive(id);
    });
    return subPromises;
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
