import { MainContext } from '../bot.interface';
import { MiddlewareFn } from 'grammy';
import { TelegramMessage } from 'src/modules/telegram-message/telegram-message.entity';
import { TelegramMessageService } from 'src/modules/telegram-message/telegram-message.service';

export function enableMessageHistory(
  telegramMessageService: TelegramMessageService,
): MiddlewareFn<MainContext> {
  return async (ctx, next) => {
    const message = ctx.message;

    if (message) {
      const msg = new TelegramMessage();
      msg.id = message.message_id.toString()
      msg.text = message.text;
      msg.date = new Date(message.date * 1000);
      await telegramMessageService.save(msg);
    }

    await next();
  };
}
