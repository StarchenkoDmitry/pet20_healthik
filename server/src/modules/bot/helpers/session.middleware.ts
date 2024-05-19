import { MiddlewareFn } from 'grammy';
import { MainContext } from '../bot.interface';
import { TelegramUserService } from 'src/modules/telegram-user/telegram-user.service';

export function enableSession(
  telegramUserService: TelegramUserService,
): MiddlewareFn<MainContext> {
  return async (ctx, next) => {
    if(!ctx.from){
        console.log("Error in Session middleware: ctx.from is undefined ");
        return;
    }

    const telgramUser = await telegramUserService.findOne(ctx.from.id);

    if (telgramUser) {
      ctx.session = telgramUser;
    } else {
        ctx.session = {
            id:ctx.from.id,
            firstName: ctx.from.first_name,
            languageCode: ctx.from.language_code ?? "en",
        };
    }

    await next();
    await telegramUserService.save(ctx.session);
  };
}
