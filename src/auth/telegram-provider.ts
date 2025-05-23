import { AuthDataValidator, objectToAuthDataMap } from '@telegram-auth/server';
import CredentialsProvider from 'next-auth/providers/credentials';

import { createUserOrUpdateTelegramUser } from '@/lib/user';

export const telegramProvider = CredentialsProvider({
  id: 'telegram',
  name: 'Telegram Login',
  credentials: {},
  async authorize(credentials, req) {
    const text = await req.text(); // Unpacked credentials
    const validator = new AuthDataValidator({
      botToken: `${process.env.BOT_TOKEN}`,
    });
    const queryStr = req.url.split('?').pop();
    const sp = new URLSearchParams(queryStr);
    const queryParams = Object.fromEntries(sp);
    const data = objectToAuthDataMap(queryParams);
    console.log('[telegram-provider:authorize] Got data', {
      data,
      text,
      credentials,
      queryStr,
      sp,
      queryParams,
      req,
      validator,
    });
    // debugger;

    const user = await validator.validate(data);

    const isOk = user.id && user.first_name;

    console.log('[telegram-provider:authorize] Got user', {
      user,
      data,
    });
    // debugger;

    if (isOk) {
      const returned = {
        id: user.id.toString(),
        email: user.id.toString(),
        name: [user.first_name, user.last_name || ''].join(' '),
        image: user.photo_url,
      };
      try {
        console.log('[telegram-provider:authorize] Create user', {
          user,
          data,
        });
        // debugger;
        await createUserOrUpdateTelegramUser(user);
        // TODO: Create account?
      } catch {
        console.error('Something went wrong while creating the user.');
        debugger;
      }
      return returned;
    }
    return null;
  },
});
