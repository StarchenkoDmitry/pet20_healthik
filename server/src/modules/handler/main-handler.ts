import { MainContext } from '../bot/bot.interface';
import { HandlerNameList } from './handler-name-list';
import { HandlerList } from './handler-list';
import { Filter } from 'grammy';


export async function mainMessageHandler(ctx: Filter<MainContext, 'message'>) {
  const currentHandler = ctx.session.currentHandler;

  const currentController = HandlerList.find(c => c.name === currentHandler);

  if (!currentController) {
    await ctx.changeHandler(HandlerNameList.mainMenu);
    return;
  }

  await currentController.process.messageHandler(ctx);
}
