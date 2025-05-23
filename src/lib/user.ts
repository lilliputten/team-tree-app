import { TelegramUserData } from '@telegram-auth/server';

import { prisma } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export async function createUserOrUpdateTelegramUser(user: TelegramUserData) {
  const provider = 'telegram';
  const providerAccountId = user.id.toString();
  const userId = providerAccountId;
  const { first_name, photo_url } = user;
  const userData = {
    name: first_name,
    image: photo_url,
  };
  const accountData = {
    // userId: userId,
    type: 'credentials',
    provider,
    providerAccountId,
  };

  const foundUser = await prisma.user.findFirst({
    where: {
      id: userId,
      /* // Try to find by linked account?
       * accounts: {
       *   some: {
       *     provider,
       *     providerAccountId,
       *   },
       * },
       */
    },
  });
  if (foundUser) {
    // Update if found
    const newUser = await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        ...userData,
        accounts: {
          // TODO: Use upsert or other create-or-update approach?
          create: [accountData],
        },
      },
    });
    console.log('[src/lib/user.ts:createUserOrUpdateTelegramUser] Created new user', {
      newUser,
    });
  } else {
    // Create, otherwise
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        ...userData,
        accounts: {
          create: [accountData],
        },
      },
    });
    console.log('[src/lib/user.ts:createUserOrUpdateTelegramUser] Created new user', {
      newUser,
    });
  }
  /* // Old approach
  await tx.account.upsert({
    where: {
      // userId: userId,
      provider,
      providerAccountId,
    },
    create: {
      userId: userId,
      type: 'credentials',
      provider,
      providerAccountId,
    },
    update: {
      userId: userId,
      type: 'credentials',
      provider,
      providerAccountId,
    },
  });
  */
}
