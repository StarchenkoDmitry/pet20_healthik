import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramUserModule } from '../telegram-user/telegram-user.module';

@Module({
  imports: [TelegramUserModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
