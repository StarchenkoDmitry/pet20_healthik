import { Module } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUser } from './telegram-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramUser])],
  providers: [TelegramUserService],
  exports: [TelegramUserService]
})
export class TelegramUserModule {}
