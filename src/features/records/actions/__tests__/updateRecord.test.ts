import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers/strings';

import { updateRecord } from '../updateRecord';

beforeEach(async () => {
  // await prisma.record.editMany({});
});

test('should edit particular record', async () => {
  // Create and receive created record ids...
  const testRecord = await prisma.record.create({
    data: { name: 'Original name', parentId: null },
  });
  const updatedName = 'Updated name';
  const updatedRecord = { ...testRecord, name: updatedName };
  try {
    // Do edit...
    await updateRecord(updatedRecord);
    // Check updated record...
    const editedRecord = await prisma.record.findUnique({ where: { id: testRecord.id } });
    expect(editedRecord?.name).toBe(updatedName);
  } catch (error) {
    const description = getErrorText(error);
    // eslint-disable-next-line no-console
    console.error('[deleteRecord.test]', description, {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  } finally {
    // Clean up...
    await prisma.record.delete({ where: { id: testRecord.id } });
  }
});
