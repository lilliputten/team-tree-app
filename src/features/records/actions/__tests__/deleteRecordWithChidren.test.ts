import { prisma } from '@/lib/db';

import { deleteRecordWithChidren } from '../deleteRecordWithChidren';

beforeEach(async () => {
  await prisma.record.deleteMany({});
});

test('should delete particular record', async () => {
  // Create and receive created record ids...
  const rootRecord = await prisma.record.create({
    data: { name: 'Root record (to remain)', parentId: null },
  });
  const rootId = rootRecord.id;
  // Create parent item and one another aside it (for test)...
  const subRecords = await prisma.record.createManyAndReturn({
    data: [
      { name: 'Parent record (to remove with all the children)', parentId: rootId },
      { name: 'Aside record (to remain)', parentId: rootId },
    ],
  });
  const [parentId, asideId] = subRecords.map(({ id }) => id);
  // Create the first level of children...
  const childrenRecords = await prisma.record.createManyAndReturn({
    data: [
      { name: 'First child record', parentId },
      { name: 'Second child record', parentId },
      { name: 'Third child record', parentId },
    ],
  });
  const [firstChildId] = childrenRecords.map(({ id }) => id);
  // Create the second level of children...
  const subChildrenRecords = await prisma.record.createManyAndReturn({
    data: [
      { name: 'First sub-child record', parentId: firstChildId },
      { name: 'Second sub-child record', parentId: firstChildId },
      { name: 'Third sub-child record', parentId: firstChildId },
    ],
  });
  const [firstSubChildId] = subChildrenRecords.map(({ id }) => id);
  // Create the second level of children...
  const subSubChildrenRecords = await prisma.record.createManyAndReturn({
    data: [
      { name: 'First sub-sub-child record', parentId: firstSubChildId },
      { name: 'Second sub-sub-child record', parentId: firstSubChildId },
      { name: 'Third sub-sub-child record', parentId: firstSubChildId },
    ],
  });
  // const [firstSubSubChildId] = subChildrenRecords.map(({ id }) => id);
  const allCreatedIds = [
    // All involved records...
    rootId,
    ...subRecords.map(({ id }) => id),
    ...childrenRecords.map(({ id }) => id),
    ...subChildrenRecords.map(({ id }) => id),
    ...subSubChildrenRecords.map(({ id }) => id),
  ];
  // Records expected to remain in the database...
  const remainingIds = [rootId, asideId];
  // Records expected to be deleted (parent one and all it's children)...
  const deletedIds = [
    parentId,
    ...childrenRecords.map(({ id }) => id),
    ...subChildrenRecords.map(({ id }) => id),
    ...subSubChildrenRecords.map(({ id }) => id),
  ];
  try {
    // Do delete...
    await deleteRecordWithChidren(parentId);
    // Check remaining records...
    const remainingCount = await prisma.record.count({
      where: {
        id: { in: remainingIds },
      },
    });
    // Check deleted records...
    const deletedCount = await prisma.record.count({
      where: {
        id: { in: deletedIds },
      },
    });
    // Check results...
    expect(remainingCount).toBe(remainingIds.length);
    expect(deletedCount).toBe(0);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: allCreatedIds } } });
    /* // DEBUG: Check the database state after the test...
     * const allRecords = await prisma.record.findMany({});
     * console.log('[deleteRecordWithChidren.test] clean-up result', {
     *   allCreatedIds,
     *   allRecords,
     * });
     * debugger;
     */
  }
});
