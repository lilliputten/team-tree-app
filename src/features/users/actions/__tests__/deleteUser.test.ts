import { User } from '@prisma/client';

import { prisma } from '@/lib/db';
import { TRecordId } from '@/features/records/types';
import { TDefinedUserId } from '@/features/users/types/TUser';

import { deleteUser } from '../deleteUser';

test('should delete the user and all the related records (as cascaded)', async () => {
  const userIds: TDefinedUserId[] = [];
  const recordIds: TRecordId[] = [];
  try {
    // Create users...
    const user1: User = await prisma.user.create({
      data: { name: 'User for deleteUser.test' },
    });
    const userId = user1.id;
    userIds.push(userId);
    // Create parent records...
    const firstRecord = await prisma.record.create({
      data: { name: 'Test record for user ' + userId, parentId: null, userId },
    });
    recordIds.push(firstRecord.id);
    // Delete user...
    const deletedUser = await deleteUser(userId);
    expect(deletedUser).not.toBeUndefined();
    // Try to get (removed) user' records
    const emptyArray = await prisma.record.findMany({
      where: { userId },
    });
    expect(emptyArray.length).toEqual(0);
  } finally {
    // Clean up...
    await prisma.record.deleteMany({ where: { id: { in: recordIds } } });
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  }
});
