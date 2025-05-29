import { CommandGroup, commands } from '@grammyjs/commands';
import { Bot, session } from 'grammy';

import { token } from './botConstants';
import { BotContext, SessionData } from './botTypes';

// @see constructor(token: string, config?: BotConfig<C>);
export const bot = new Bot<BotContext>(token);

bot.use(commands());

export const botCommands = new CommandGroup();
// Registers the command handlers
bot.use(botCommands);

bot.use(
  session({
    initial: (): SessionData => ({
      // Default sesion contents...
      __language_code: undefined,
    }),
  }),
);
