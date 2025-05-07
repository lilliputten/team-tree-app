import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { prisma } from '@/lib/db';
import { getUserById } from '@/lib/user';
import authConfig from '@/auth.config';
import { isDev } from '@/constants';

export const nextAuthApp = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    // @see https://next-auth.js.org/configuration/pages
    // signIn: '/login', // TODO: Add login page (see examples in `wordwizzz-saas` project)
    // error: "/auth/error",
  },
  callbacks: {
    async session(params) {
      const { token, session } = params;
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          // @see JWT type extension in `@types/next-auth.d.ts`
          session.user.role = token.role;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt(params) {
      const { token } = params;
      if (!token.sub) {
        return token;
      }

      const dbUser = await getUserById(token.sub);

      if (!dbUser) {
        return token;
      }

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
  debug: isDev,
});

export const {
  handlers: { GET, POST },
  auth,
} = nextAuthApp;
