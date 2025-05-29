import { TelegramUserData } from '@telegram-auth/server';

import { prisma } from '@/lib/db';

export async function createUserOrUpdateTelegramUser(user: TelegramUserData) {
  const provider = 'telegram-auth';
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
    await prisma.user.update({
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
  } else {
    // Create, otherwise
    await prisma.user.create({
      data: {
        id: userId,
        ...userData,
        accounts: {
          create: [accountData],
        },
      },
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
