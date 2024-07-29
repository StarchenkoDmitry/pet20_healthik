import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './telegram/bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TelegramMessageModule } from './telegram/telegram-message/telegram-message.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/user/role/role.module';
import { TelegramUserModule } from './telegram/telegram-user/telegram-user.module';
import { GlobalExceptionHandler } from './shared/filters/global-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ChatModule } from './modules/chat/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ 
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    DatabaseModule,

    UserModule,
    AuthModule,
    RoleModule,
    ChatModule,

    TelegramUserModule,
    TelegramMessageModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalExceptionHandler,
    HttpExceptionFilter
  ],
})
export class AppModule {}
