import 'server-only';

import { cache } from 'react';

import { TOptionalExtendedUser } from '@/shared/types/TUser';
import { auth } from '@/auth';

/** Server: Get user data from auth data.
 * Use `useSessionUser` fro client components.
 */
export const getCurrentUser = cache<() => Promise<TOptionalExtendedUser>>(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  return session.user;
});
