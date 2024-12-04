/* eslint-env jest */

/** Test db. Ensure if it has been created */
const DATABASE_URL = 'file:.data/test.db';

/* NOTE: The `@t3-oss/env-nextjs` module ruins the tests with weird
 * `SyntaxError: Cannot use import statement outside a module`. It should be
 * mocked (see `jestCommonSetup.js`).
 */

jest.mock('@t3-oss/env-nextjs', () => ({
  createEnv: jest.fn(() => ({
    DATABASE_URL: DATABASE_URL,
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  })),
}));

// Set it for prisma also
process.env.DATABASE_URL = DATABASE_URL;
