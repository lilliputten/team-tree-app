import { TRecordWithoutId } from '@/features/records/types';
import { Context, createMockContext, MockContext } from '@/jest/jestPrismaContext';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

async function createRecord(record: TRecordWithoutId, ctx: Context) {
  if (record.name) {
    return await ctx.prisma.record.create({
      data: record,
    });
  } else {
    return new Error('Record should have name!');
  }
}

test('should create new record ', async () => {
  const record = {
    id: 1,
    name: 'Test record',
    parentId: null,
  };
  mockCtx.prisma.record.create.mockResolvedValue(record);

  await expect(createRecord(record, ctx)).resolves.toEqual({
    id: 1,
    name: 'Test record',
    parentId: null,
  });
});
