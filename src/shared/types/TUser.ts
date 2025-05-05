// TODO: Move to `/types`
// import { UserRole } from '@prisma/client';
// import NextAuth from 'next-auth';
import {
  // DefaultSession,
  User,
} from 'next-auth';

export type TUser = User;

export type TOptionalUserId = User['id'];
export type TUserId = NonNullable<TOptionalUserId>;

export type TExtendedUser = {
  role: UserRole;
} & TUser;

export type TOptionalExtendedUser = TExtendedUser | undefined;
