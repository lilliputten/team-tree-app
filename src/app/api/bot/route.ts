/* See:
 * Formatting:
 * - https://grammy.dev/ref/types/parsemode
 * - https://grammy.dev/guide/basics
 *
 * Initalize a telgram bot hook via a template:
 *
 * ```bash
 * curl https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={APP_URL}/api/bot
 * ```
 *
 * See scripts:
 *
 * - `.scripts/init-tg-bot.sh`
 *
 */

import { CommandGroup, commands, CommandsFlavor } from '@grammyjs/commands';
import {
  Bot,
  CallbackQueryContext,
  CommandContext,
  Context,
  InlineKeyboard,
  session,
  SessionFlavor,
  webhookCallback,
} from 'grammy';
import { getTranslations } from 'next-intl/server';

import { defaultLocale, localesList } from '@/i18n/types';

interface SessionData {
  __language_code?: string;
}

type BotContext = Context & SessionFlavor<SessionData> & CommandsFlavor;

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const appHost = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL
  : process.env.NEXT_PUBLIC_APP_URL;
if (!appHost) {
  throw new Error('No webapp host provided (NEXT_PUBLIC_APP_URL or VERCEL_URL)');
}
const webAppUrl = `${appHost}/miniapp`;

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN environment variable not found.');
}

const bot = new Bot<BotContext>(token);
bot.use(commands());

function initialSession(): SessionData {
  return { __language_code: undefined };
}
bot.use(session({ initial: initialSession }));

const botCommands = new CommandGroup();
// Registers the command handlers
bot.use(botCommands);

initBotCommands();

async function initBotCommands(
  locale?: string,
  ctx?: CommandContext<BotContext> | CallbackQueryContext<BotContext>,
) {
  const t = await getTranslations({ locale: locale || 'en', namespace: 'BotMenu' });
  const tRu = await getTranslations({ locale: 'ru', namespace: 'BotMenu' });

  function addCommand(commandsGroup: CommandGroup<BotContext>, id: string) {
    if (locale) {
      commandsGroup.command(id, t(id));
    } else {
      commandsGroup.command(id, t(id)).localize('ru', id, tRu(id));
    }
  }

  addCommand(botCommands, 'start');
  addCommand(botCommands, 'language');

  await botCommands.setCommands(bot);

  if (ctx) {
    await ctx.setMyCommands(botCommands);
  }
}

function getContextLocale(ctx: CommandContext<BotContext>) {
  console.log('[route:getContextLocale]', {
    session: ctx.session,
    from: ctx.update.message?.from,
  });
  const session = ctx.session;
  if (session?.__language_code) {
    return session.__language_code;
  }
  const from = ctx.from; // ctx.update.message?.from;
  if (from?.language_code) {
    return from.language_code;
  }
  return defaultLocale;
}

bot.command('start', async (ctx: CommandContext<BotContext>) => {
  const locale = getContextLocale(ctx);
  const t = await getTranslations({ locale, namespace: 'Bot' });
  console.log('[bot:route:command:start]', {
    locale,
    webAppUrl,
    ctx,
  });
  const keyboard = new InlineKeyboard().webApp(t('openApp'), webAppUrl);
  await ctx.reply(t('start'), {
    parse_mode: 'MarkdownV2',
    reply_markup: keyboard,
  });
});

bot.command('language', async (ctx: CommandContext<BotContext>) => {
  const locale = getContextLocale(ctx);
  const t = await getTranslations({ locale, namespace: 'Bot' });
  const tNav = await getTranslations({ locale: defaultLocale, namespace: 'NavLocaleSwitcher' });
  console.log('[bot:route:command:language]', {
    locale,
    webAppUrl,
    ctx,
  });
  const keyboard = new InlineKeyboard();
  localesList.forEach((locale) => {
    const text = tNav('locale', { locale });
    keyboard.text(text, `select-language-${locale}`); // (ctx) => ctx.reply('You pressed A!'));
  });
  await ctx.reply(t('selectLanguage'), {
    reply_markup: keyboard,
  });
});

// Select language callbacks
localesList.forEach(async (locale) => {
  bot.callbackQuery(`select-language-${locale}`, async (ctx) => {
    const session = ctx.session;
    const t = await getTranslations({ locale, namespace: 'Bot' });
    const tNav = await getTranslations({ locale: defaultLocale, namespace: 'NavLocaleSwitcher' });
    const localeText = tNav('locale', { locale });
    const text = t('languageChangedFor') + ' ' + localeText;
    console.log('[route:select-language]', locale, {
      locale,
      text,
      session,
    });
    session.__language_code = locale;
    await ctx.answerCallbackQuery({
      text,
    });
    await ctx.editMessageReplyMarkup();
    await initBotCommands(locale, ctx);
    await ctx.reply(text);
  });
});

bot.command('help', async (ctx: CommandContext<BotContext>) => {
  const locale = getContextLocale(ctx);
  const t = await getTranslations({ locale, namespace: 'Bot' });
  await ctx.reply(t('help'));
});

// DEBUG: Mirror all the texts
bot.on('message:text', async (ctx) => {
  console.log('[bot:route:message:text]', {
    // ctx,
  });
  await ctx.reply(
    // Send bold text
    `*${ctx.message.text}*`,
    { parse_mode: 'MarkdownV2' },
  );
});

export const POST = webhookCallback(bot, 'std/http');
