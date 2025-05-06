import { prisma } from '@/lib/db';

import { addRecord } from '../addRecord';

test('should create several records', async () => {
  const createdRecords = await Promise.all([
    addRecord({ userId: null, name: 'First added record', parentId: null }),
    addRecord({ userId: null, name: 'Second added record', parentId: null }),
  ]);
  const createdIds = createdRecords.map(({ id }) => id);
  try {
    expect(createdRecords.length).toBe(2);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: createdIds } } });
  }
});

test('should create new record with a new id', async () => {
  const createdRecord = await addRecord({ userId: null, name: 'Test record', parentId: null });
  try {
    expect(createdRecord).toHaveProperty('id');
  } finally {
    // Clean up...
    await prisma.record.delete({ where: { id: createdRecord.id } });
  }
});
