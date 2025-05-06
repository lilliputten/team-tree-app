import 'server-only';

import { cache } from 'react';

import { TOptionalExtendedUser } from '@/shared/types/TUser';
import { auth } from '@/auth';

export const getCurrentUser = cache<() => Promise<TOptionalExtendedUser>>(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  return session.user;
});
