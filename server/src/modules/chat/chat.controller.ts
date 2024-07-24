import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../user/role/role.decorator';
import { ADMIN_ROLE } from 'src/common/constants/role';
import { User } from '../user/user.entity';
import { ChatService } from './chat.service';
import { CreateNormalChat } from './dto/create-normal-chat.dto';
import { CreateConsultationChat } from './dto/create-consultation-chat.dto';
import { CreateConversationChatResponse } from 'src/common/types/chat';
import { Message } from './entites/message.entity';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat')
  @UseGuards(AuthGuard)
  @Roles(ADMIN_ROLE)
  async create(@GetUser() user: User, @Body() data: CreateNormalChat) {
    return await this.chatService.createNormalChat(user.id,data.userId)
  }

  @Get('chats/ids')
  @UseGuards(AuthGuard)
  async getChatIds(@GetUser() user: User) {
    return await this.chatService.getChatIds(user.id)
  }

  @Post('chat/new-consultation')
  @UseGuards(AuthGuard)
  async createConsultation(
    @GetUser() user: User, 
    @Body() { title, description }: CreateConsultationChat
  ): Promise<CreateConversationChatResponse> {
    const chatId = await this.chatService.createConsultationChat(user.id,title,description)
    return { chatId };
  }
  
  @Post('chat/:chatId/message')
  @UseGuards(AuthGuard)
  async addMessage(
    @GetUser() user: User, 
    @Param('chatId') chatId: string,
    @Body() { text }: { text: string },
  ): Promise<Message> {
    const newMessage = await this.chatService.createMessageQuickly(
      chatId, 
      user.id, 
      text
    );
    return newMessage;
  }
  
}
