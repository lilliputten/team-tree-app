import { prisma } from '@/lib/db';

import { addRecord } from '../addRecord';

beforeEach(async () => {
  await prisma.record.deleteMany({});
});

test('should create several records', async () => {
  const results = await Promise.all([
    addRecord({ name: 'First record', parentId: null }),
    addRecord({ name: 'Second record', parentId: null }),
  ]);
  /* console.log('[addRecord.test] result', {
   *   results,
   * });
   */
  expect(results.length).toBe(2);
});

test('should create new record with a new id', async () => {
  const newRecord = {
    name: 'Test record',
    parentId: null,
  };
  const result = await addRecord(newRecord);
  /* console.log('[addRecord.test] result', {
   *   result,
   *   newRecord,
   * });
   */
  expect(result).toHaveProperty('id');
});
