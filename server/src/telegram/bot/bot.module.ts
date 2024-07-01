import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramUserModule } from '../telegram-user/telegram-user.module';
import { TelegramMessageModule } from '../../telegram/telegram-message/telegram-message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { TelegramMessage } from '../../telegram/telegram-message/telegram-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TelegramUser, TelegramMessage]),
    TelegramUserModule,
    TelegramMessageModule,
  ],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
