import { Module } from '@nestjs/common';
import { TelegramMessageService } from './telegram-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramMessage } from './telegram-message.entity';
import { TelegramMessageController } from './telegram-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramMessage])],
  controllers: [TelegramMessageController],
  providers: [TelegramMessageService],
  exports: [TelegramMessageService]
})
export class TelegramMessageModule {}
