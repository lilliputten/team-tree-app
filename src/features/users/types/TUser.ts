import { User } from '@prisma/client';
import { User as SessionUser } from 'next-auth';

export type TUser = User;
export type TSessionUser = SessionUser;

// export type TOptionalUserId = User['id'];
// export type TOptionalUserId = NonNullable<TOptionalUserId>;
export type TDefinedUserId = TUser['id'];
export type TOptionalUserId = TDefinedUserId | null;

export type TExtendedUser = {
  role: UserRole;
} & TSessionUser;

export type TOptionalExtendedUser = TExtendedUser | undefined;
