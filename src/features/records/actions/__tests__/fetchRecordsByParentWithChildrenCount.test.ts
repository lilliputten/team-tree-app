import { prisma } from '@/lib/db';

import { fetchRecordsByParentWithChildrenCount } from '../fetchRecordsByParentWithChildrenCount';

test('should return records with chidlren count', async () => {
  // Create parent...
  const parentRecord = await prisma.record.create({
    data: { name: 'Parent record', parentId: null },
  });
  const parentId = parentRecord.id;
  const createdIds = [parentId];
  try {
    // Create two children...
    const createdRecords = await prisma.record.createManyAndReturn({
      data: [
        { name: 'First child record', parentId },
        { name: 'Second child record', parentId },
      ],
    });
    const createdRecordIds = createdRecords.map(({ id }) => id);
    createdIds.push(...createdRecordIds);
    // Find records with chidlren count included (in `_count.children`)
    const records = await fetchRecordsByParentWithChildrenCount(null);
    // Find previously created record in all the fetch results...
    const foundRecord = records.find((it) => it.id === parentId);
    expect(typeof foundRecord).toBe('object');
    // Really found?
    if (!foundRecord) {
      throw new Error('Not found created parent error');
    }
    expect(foundRecord._count.children).toBe(2);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: createdIds } } });
  }
});
