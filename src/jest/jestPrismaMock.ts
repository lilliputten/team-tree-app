import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

// import prisma from './client'
// import { prisma } from '@/lib/db/prisma';
import { jestPrisma } from '@/lib/db/jestPrisma';

jest.mock('@/lib/db/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  console.log('[jestPrismaMock] 2', {
    // prisma,
    jestPrisma,
    jestPrismaMock,
    mockReset,
    mockDeep,
    // DeepMockProxy,
  });
  debugger;
  mockReset(jestPrismaMock);
});

export const jestPrismaMock = jestPrisma as unknown as DeepMockProxy<PrismaClient>;
console.log('[jestPrismaMock] 1', {
  // prisma,
  jestPrisma,
  jestPrismaMock,
  mockReset,
});
