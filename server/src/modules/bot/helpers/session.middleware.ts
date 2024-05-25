import { MiddlewareFn } from 'grammy';
import { MainContext } from '../bot.interface';
import { TelegramUserService } from 'src/modules/telegram-user/telegram-user.service';
import { 
  DEFAULT_HANDLER_NAME_ON_INITIALIZATION, 
  DEFAULT_I18N_LANGUAGE_CODE 
} from 'src/config';


export function enableSession(
  telegramUserService: TelegramUserService,
): MiddlewareFn<MainContext> {
  return async (ctx, next) => {
    if(!ctx.from){
      console.log("Error in Session middleware: ctx.from is undefined");
      return;
    }

    const telgramUser = await telegramUserService.findOne(ctx.from.id.toString());

    if (telgramUser) {
      ctx.session = telgramUser;
    } else {
      ctx.session = {
        id: ctx.from.id.toString(),
        firstName: ctx.from.first_name,
        languageCode: ctx.from.language_code ?? DEFAULT_I18N_LANGUAGE_CODE,
        currentHandler: DEFAULT_HANDLER_NAME_ON_INITIALIZATION
      };
    }

    await next();

    await telegramUserService.save(ctx.session);
  };
}
