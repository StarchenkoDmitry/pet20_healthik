import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramUserModule } from '../telegram-user/telegram-user.module';
import { TelegramMessageModule } from '../telegram-message/telegram-message.module';

@Module({
  imports: [
    TelegramUserModule,
    TelegramMessageModule
  ],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
