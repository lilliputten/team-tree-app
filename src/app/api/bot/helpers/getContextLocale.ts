import { CommandContext } from 'grammy';

import { defaultLocale } from '@/i18n/types';

import { BotContext } from '../core/botTypes';

export function getContextLocale(ctx: CommandContext<BotContext>) {
  /* console.log('[getContextLocale]', {
   *   session: ctx.session,
   *   from: ctx.update.message?.from,
   * });
   */
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
