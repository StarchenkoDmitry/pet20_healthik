import { Keyboard } from 'grammy';
import { HandlerType } from '../handler.interface';
import { MainContext } from 'src/modules/bot/bot.interface';
import { HandlerNameList } from '../handler-name-list';


function createMenu(ctx: MainContext) {
  const menu = new Keyboard()
  .text(ctx.t('main-menu_btn_random-number'))
  .text(ctx.t('main-menu_btn_language-settings'))
  .row()
  .text(ctx.t('main-menu_btn_whoami'))
  .row()
  .resized();
  return menu;
}

export const MainMenuHandler: HandlerType = {
  messageHandler: async ctx => {
    const text = ctx.message.text;

    if (!text) return;

    switch (text) {
      case ctx.t('main-menu_btn_random-number'):
        const randNumber = Math.floor(Math.random() * 1000);
        await ctx.reply(`${randNumber}`);
        ctx.session.firstName = `dimas-${randNumber}`
        break;
      case ctx.t('main-menu_btn_language-settings'):
        await ctx.changeHandler(HandlerNameList.languageSettings);
        break;
      case ctx.t('main-menu_btn_whoami'):
        await ctx.reply(ctx.t('main-menu_whoami'));
        break;
    }
  },
  enter: async ctx => {
    await ctx.reply(ctx.t('main-menu_title'), {
      reply_markup: createMenu(ctx),
    });
  },
};
