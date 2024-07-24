import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from './entites/chat.entity';
import { ChatMember } from './entites/chat-member.entity';
import { Message } from './entites/message.entity';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { GatewayGuard } from './gateway.middleware';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Chat, 
      ChatMember, 
      Message
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [
    ConfigService,
    ChatService,
    ChatGateway,
    GatewayGuard,
  ],
  exports: [ChatService],
})
export class ChatModule {}
