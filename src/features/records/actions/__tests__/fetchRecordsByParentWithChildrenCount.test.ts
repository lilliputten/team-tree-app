import { User } from '@prisma/client';

import { prisma } from '@/lib/db';
import { TDefinedUserId } from '@/features/users/types/TUser';

import { TRecordId } from '../../types';
import { fetchRecordsByParentWithChildrenCount } from '../fetchRecordsByParentWithChildrenCount';

test('should return records with chidlren count', async () => {
  // Create parent...
  const parentRecord = await prisma.record.create({
    data: { name: 'Parent record', parentId: null },
  });
  const parentId = parentRecord.id;
  const recordIds = [parentId];
  try {
    // Create two children...
    const createdChildren = await prisma.record.createManyAndReturn({
      data: [
        { name: 'First child record', parentId },
        { name: 'Second child record', parentId },
      ],
    });
    const createdChildrenIds = createdChildren.map(({ id }) => id);
    recordIds.push(...createdChildrenIds);
    // Find records with chidlren count included (in `_count.children`)
    const records = await fetchRecordsByParentWithChildrenCount();
    // Find previously created record in all the fetch results...
    const foundRecords = records.find((it) => it.id === parentId);
    expect(foundRecords).not.toBeUndefined();
    // Really found?
    if (!foundRecords) {
      throw new Error('Not found created parent');
    }
    expect(foundRecords._count.children).toBe(2);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: recordIds } } });
  }
});

test('should not return records for different user', async () => {
  const userIds: TDefinedUserId[] = [];
  const recordIds: TRecordId[] = [];
  try {
    // Create users...
    const user1: User = await prisma.user.create({
      data: { name: 'User1' },
    });
    userIds.push(user1.id);
    const user2: User = await prisma.user.create({
      data: { name: 'User1' },
    });
    userIds.push(user2.id);
    // Create parent records...
    const firstRecord = await prisma.record.create({
      data: { name: 'Parent record', parentId: null, userId: user1.id },
    });
    recordIds.push(firstRecord.id);
    const secondRecord = await prisma.record.create({
      data: { name: 'Second record', parentId: null, userId: user2.id },
    });
    recordIds.push(secondRecord.id);
    // Create children...
    const createdChildren = await prisma.record.createManyAndReturn({
      data: [
        { name: 'First child record', parentId: firstRecord.id, userId: user1.id },
        { name: 'Second child record', parentId: firstRecord.id },
      ],
    });
    const createdChildrenIds = createdChildren.map(({ id }) => id);
    recordIds.push(...createdChildrenIds);
    // Try to find children of the second record
    const secondRecords = await fetchRecordsByParentWithChildrenCount({
      userId: secondRecord.userId,
    });
    // Should not be found first record children if requested only second record ones
    const impossible = secondRecords.find((it) => it.id === firstRecord.id);
    expect(impossible).toBeUndefined();
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: recordIds } } });
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  }
});
