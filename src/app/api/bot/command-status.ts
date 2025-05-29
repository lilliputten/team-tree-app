import { TelegramUserData } from '@telegram-auth/server';
import { CallbackQueryContext, CommandContext, InlineKeyboard } from 'grammy';
import { getFormatter, getTranslations } from 'next-intl/server';

import { prisma } from '@/lib/db';
import { createUserOrUpdateTelegramUser } from '@/features/users/actions';

import { bot } from './core/botSinglton';
import { BotContext } from './core/botTypes';
import { getContextLocale } from './helpers/getContextLocale';
import { getTelegramUserThumbnailUrl } from './helpers/getTelegramUserThumbnailUrl';

bot.command('status', async (ctx: CommandContext<BotContext>) => {
  const locale = getContextLocale(ctx);
  const t = await getTranslations({ namespace: 'Bot', locale });
  const ctxUser = ctx.from;
  if (!ctxUser) {
    return await ctx.reply(t('noUserData'), {
      // parse_mode: 'MarkdownV2',
    });
  }
  const msg = await ctx.reply(t('checkingStatus'));
  const provider = 'telegram-auth';
  const providerAccountId = String(ctxUser.id);
  // Try to get an account for provider="telegram*" and providerAccountId={id}
  // Get the user ID if the account exists
  const user = await prisma.user.findFirst({
    where: {
      // Try to find by linked account
      accounts: {
        some: {
          provider,
          providerAccountId,
        },
      },
    },
    // include: { accounts: true },
  });
  /* console.log('[bot:command-status] Got user?', {
   *   ctxUser,
   *   user,
   * });
   */
  if (!user) {
    await bot.api.deleteMessage(msg.chat.id, msg.message_id);
    // Ask for creating a user/account record
    const keyboard = new InlineKeyboard();
    keyboard.text(t('yes'), 'create-account-yes');
    keyboard.text(t('no'), 'create-account-no');
    await ctx.reply(t('statusNoUser'), {
      reply_markup: keyboard,
    });
    return;
  }
  // Get and show the number of existing records
  await bot.api.editMessageText(msg.chat.id, msg.message_id, t('gettingData'));
  const records = await prisma.record.findMany({
    where: {
      userId: user.id,
    },
  });
  const format = await getFormatter({ locale });
  const showData = {
    recordsCount: records.length || 0,
    createdAt: format.dateTime(user.createdAt, {
      // year: 'numeric',
      // month: 'long',
      // day: 'numeric',
      dateStyle: 'short',
    }),
  };
  /* console.log('[bot:command-status] Got records?', {
   *   showData,
   *   records,
   *   user,
   * });
   */
  if (!records.length) {
    await bot.api.editMessageText(msg.chat.id, msg.message_id, t('noRecordsInfo', showData));
  } else {
    await bot.api.editMessageText(msg.chat.id, msg.message_id, t('haveRecordsInfo', showData));
  }
});

async function createAccountQueryCallback(
  trigger: 'create-account-yes' | 'create-account-no',
  ctx: CallbackQueryContext<BotContext>,
) {
  // const session = ctx.session;
  const locale = getContextLocale(ctx);
  const t = await getTranslations({ locale, namespace: 'Bot' });
  await ctx.editMessageReplyMarkup();
  if (trigger !== 'create-account-yes') {
    return;
  }
  const msg = await ctx.reply(t('creatingAccount'));
  const user = ctx.from;
  const photoUrl = await getTelegramUserThumbnailUrl(ctx, user.id);
  const tgUser: TelegramUserData = {
    ...user,
    photo_url: photoUrl,
  };
  /* console.log('[command-status:createAccountQueryCallback] Start', {
   *   tgUser,
   *   msg,
   * });
   */
  try {
    // throw new Error('Test error'); // DEBUG
    createUserOrUpdateTelegramUser(tgUser);
  } catch (error) {
    const text = t('canNotCreateAccount');
    // eslint-disable-next-line no-console
    console.error('[command-status:createAccountQueryCallback]', text, {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    await ctx.answerCallbackQuery({ text });
    await bot.api.editMessageText(msg.chat.id, msg.message_id, text);
    return;
  }
  const text = t('accountCreated');
  await ctx.answerCallbackQuery({ text });
  await bot.api.editMessageText(msg.chat.id, msg.message_id, text);
  /* console.log('[command-status:createAccountQueryCallback] Done', {
   *   tgUser,
   *   msg,
   * });
   */
}

bot.callbackQuery(
  'create-account-yes',
  async (ctx) => await createAccountQueryCallback('create-account-yes', ctx),
);
bot.callbackQuery(
  'create-account-no',
  async (ctx) => await createAccountQueryCallback('create-account-no', ctx),
);
