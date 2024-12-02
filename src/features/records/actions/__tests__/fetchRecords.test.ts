import { prisma } from '@/lib/db';

import { addRecord } from '../addRecord';
import { fetchRecords } from '../fetchRecords';

beforeEach(async () => {
  // console.log('[fetchRecords.test] beforeEach');
  await prisma.record.deleteMany({});
});

test('should return all available records', async () => {
  await Promise.all([
    addRecord({ name: 'First record', parentId: null }),
    addRecord({ name: 'Second record', parentId: null }),
  ]);
  const results = await fetchRecords();
  /* console.log('[fetchRecords.test] 1: result', {
   *   results,
   * });
   */
  expect(results.length).toBe(2);
});

test('should return all chidren records', async () => {
  const parentRecord = await addRecord({ name: 'Parent record', parentId: null });
  const parentId = parentRecord.id;
  // Add extra record to provide clear test results
  await addRecord({ name: 'Orphan record', parentId: null });
  await Promise.all([
    addRecord({ name: 'First child', parentId }),
    addRecord({ name: 'Second child', parentId }),
  ]);
  // Find parent's children records (only)
  const results = await fetchRecords(parentId);
  /* console.log('[fetchRecords.test] 2: result', {
   *   parentRecord,
   *   parentId,
   *   results,
   * });
   */
  expect(results.length).toBe(2);
});
