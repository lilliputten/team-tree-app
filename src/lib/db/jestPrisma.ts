// NOTE: Is it required? (Used only for jest.)

import { PrismaClient } from '@prisma/client';

export const jestPrisma = new PrismaClient();
