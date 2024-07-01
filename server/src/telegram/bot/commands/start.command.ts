import { CommandContext } from 'grammy';
import { MainContext } from '../bot.interface';
import { HandlerNameList } from 'src/telegram/handler/handler-name-list';
import { DEFAULT_HANDLER_NAME_AFTER_START } from 'src/config';

export async function startCommand(ctx: CommandContext<MainContext>) {
  if (ctx.session.currentHandler !== HandlerNameList.none) {
    await ctx.reply(ctx.t('start-registered'));
    return;
  }

  await ctx.reply(ctx.t('start-welcome'));
  
  await ctx.changeHandler(DEFAULT_HANDLER_NAME_AFTER_START);
}
