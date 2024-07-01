import { sequentialize } from '@grammyjs/runner';
import { MiddlewareFn } from 'grammy';
import { MainContext } from '../bot.interface';

export function enableSequentionlize(): MiddlewareFn<MainContext> {
  return sequentialize<MainContext>(ctx => {
    const chatId = ctx.chat?.id;
    const userId = ctx.from?.id;
    return `${chatId ?? '' }/${userId ?? ''}`;
  });
}
