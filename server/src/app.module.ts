import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './modules/bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { TelegramUserModule } from './modules/telegram-user/telegram-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, }),
    DatabaseModule,
    TelegramUserModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
