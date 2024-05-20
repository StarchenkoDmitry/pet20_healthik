import { MainContext } from '../bot.interface';
import { MiddlewareFn } from 'grammy';
import { TelegramMessageService } from 'src/modules/telegram-message/telegram-message.service';

export function enableMessageHistory(
  telegramMessageService: TelegramMessageService,
): MiddlewareFn<MainContext> {
  return async (ctx, next) => {
    const message = ctx.message;

    if (message) {
      console.log('ctx.message: ', ctx.message);

      const res = await telegramMessageService.save({
        id: message.message_id as any,
        text: message.text ?? '',
        date: new Date(message.date * 1000),
        created_at: undefined as any,
      });
    }

    await next();
  };
}
