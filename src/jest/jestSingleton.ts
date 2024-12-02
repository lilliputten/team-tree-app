import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

import { jestPrisma } from '@/lib/db/jestPrisma';

jest.mock('@/lib/db/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = jestPrisma as unknown as DeepMockProxy<PrismaClient>;
