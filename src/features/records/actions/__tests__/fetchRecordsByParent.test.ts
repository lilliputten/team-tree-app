import { prisma } from '@/lib/db';

import { fetchRecordsByParent } from '../fetchRecordsByParent';

test('should return all available records with undefined parentId', async () => {
  const createdRecord = await prisma.record.create({
    data: { name: 'First record (1)', parentId: null },
  });
  try {
    const allRecords = await fetchRecordsByParent(null);
    const allRecordIds = allRecords.map(({ id }) => id);
    expect(allRecordIds.includes(createdRecord.id)).toBe(true);
  } finally {
    // Clean up...
    await prisma.record.delete({ where: { id: createdRecord.id } });
  }
});

it('should return all chidren records with parentId', async () => {
  const parentRecord = await prisma.record.create({
    data: { name: 'Parent record (2)', parentId: null },
  });
  const parentId = parentRecord.id;
  const createdIds = [parentId];
  try {
    // Create and receive created record ids...
    const createdRecords = await prisma.record.createManyAndReturn({
      data: [
        { name: 'Orphan record (2)', parentId: null },
        { name: 'First child record (2)', parentId },
        { name: 'Second child record (2)', parentId },
      ],
    });
    const createdRecordIds = createdRecords.map(({ id }) => id);
    createdIds.push(...createdRecordIds);
    // Find parent's children records (only)
    const results = await fetchRecordsByParent(parentId);
    expect(results.length).toBe(2);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: createdIds } } });
  }
});

test('should return root records with parentId = null', async () => {
  const parentRecord = await prisma.record.create({
    data: { name: 'Parent record (3)', parentId: null },
  });
  const parentId = parentRecord.id;
  const createdIds = [parentId];
  try {
    // Create and receive created record ids...
    const createdRecords = await prisma.record.createManyAndReturn({
      data: [
        { name: 'First child record (3)', parentId },
        { name: 'Second child record (3)', parentId },
      ],
    });
    const createdRecordIds = createdRecords.map(({ id }) => id);
    createdIds.push(...createdRecordIds);
    // Find the parent's children records (only)
    const foundParentRecords = await fetchRecordsByParent(null);
    const foundParentRecordIds = foundParentRecords.map(({ id }) => id);
    expect(foundParentRecordIds.includes(parentId)).toBeTruthy();
    expect(foundParentRecordIds.includes(createdRecordIds[0])).toBeFalsy();
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: createdIds } } });
  }
});
