import { prisma } from '@/lib/db';

import { addRecord } from '../addRecord';
import { deleteRecord } from '../deleteRecord';
import { fetchRecords } from '../fetchRecords';

beforeEach(async () => {
  await prisma.record.deleteMany({});
});

test('should delete particular record', async () => {
  // Add and receive added record ids...
  const resultIds = (
    await Promise.all([
      addRecord({ name: 'First record', parentId: null }),
      addRecord({ name: 'Second record', parentId: null }),
      addRecord({ name: 'Third record', parentId: null }),
    ])
  ).map(({ id }) => id);
  // Get ready to remove the first one
  const deleteId = resultIds.shift();
  if (!deleteId) {
    throw new Error('Can not get added record id');
  }
  // Do delete...
  await deleteRecord(deleteId);
  const foundResults = await fetchRecords();
  /* console.log('[deleteRecord.test] result', {
   *   deleteId,
   *   foundResults,
   *   resultIds,
   * });
   */
  expect(foundResults.length).toBe(resultIds.length);
});
