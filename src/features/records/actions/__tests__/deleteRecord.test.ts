import { prisma } from '@/lib/db';

import { deleteRecord } from '../deleteRecord';

beforeEach(async () => {
  // await prisma.record.deleteMany({});
});

test('should delete particular record', async () => {
  // Create and receive created record ids...
  const createdRecords = await prisma.record.createManyAndReturn({
    data: [
      { name: 'First deleting record', parentId: null },
      { name: 'Second deleting record', parentId: null },
      { name: 'Third deleting record', parentId: null },
    ],
  });
  const createdIds = createdRecords.map(({ id }) => id);
  try {
    // Get ready to remove the first one
    const deletingId = createdIds.shift();
    const remainingId = createdIds[0];
    if (!deletingId) {
      throw new Error('Can not get added record id');
    }
    // Do delete...
    await deleteRecord(deletingId);
    // Check deleted and remaning records...
    const deletedRecord = await prisma.record.findUnique({ where: { id: deletingId } });
    if (deletedRecord) {
      throw new Error('Deleted record should not be prsent in the database!');
    }
    const remainingRecord = await prisma.record.findUnique({ where: { id: remainingId } });
    if (!remainingRecord) {
      throw new Error('Remaining record should be prsent in the database!');
    }
    expect(remainingRecord.id).toBe(remainingId);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: createdIds } } });
  }
});
