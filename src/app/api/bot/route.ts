import {
  Bot,
  CommandContext,
  Context,
  InlineKeyboard,
  webhookCallback,
  // WebAppButton,
} from 'grammy';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

/*
 * Start bot via a template:
 * curl https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={APP_URL}/api/bot
 */

// const webAppExternalUrl = 'https://t.me/LlMiniAppBot/LlMiniApp';
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

const bot = new Bot(token);

bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Show help text' },
  // { command: 'settings', description: 'Open settings' },
]);

bot.command('start', async (ctx: CommandContext<Context>) => {
  console.log('[bot:route:command:start]', {
    webAppUrl,
    ctx,
  });
  const keyboard = new InlineKeyboard().webApp('Open Web App', webAppUrl);
  // return await ctx.reply('👋 Welcome!');
  return await ctx.reply('👋 Welcome to the bot!', {
    reply_markup: keyboard,
  });
});

bot.command('help', async (ctx: CommandContext<Context>) => {
  console.log('[bot:route:command:help]', ctx);
  return await ctx.reply(`📖 Help text!`);
  // await ctx.reply(ctx.message.text);
});

// DEBUG: Mirrot all the texts
bot.on('message:text', async (ctx) => {
  console.log('[bot:route:message:text]', {
    ctx,
  });
  return await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, 'std/http');
