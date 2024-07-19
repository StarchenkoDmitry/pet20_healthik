import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entites/chat.entity';
import { Message } from './entites/message.entity';
import { ChatMember } from './entites/chat-member.entity';
import { ChatStatusType, ChatType } from '../../common/enum/chat.enum';
import { MemberType } from '../../common/enum/member.enum';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(ChatMember)
    private readonly memberRepository: Repository<ChatMember>,
  ) {}

  async createNormalChat(
    userId: string,
    inviteUserId: string
  ): Promise<string> {
    const newChatId = await this.chatRepository.manager.transaction(
      'SERIALIZABLE',
      async ctx => {
        const chatRepo = ctx.getRepository(Chat);
        const membersRepo = ctx.getRepository(ChatMember);

        const chatExsisted = await chatRepo.findOne({
          where:{
            type:ChatType.Normal,
            members:[
              {user:{id:userId}},
              {user:{id:inviteUserId}},
            ]
          }
        });

        if(chatExsisted){
          throw new HttpException("A chat room already exists", HttpStatus.CONFLICT);
        }

        const mem1 = membersRepo.create({user:{id:userId},isCreator:true,});
        const mem2 = membersRepo.create({user:{id:inviteUserId},isCreator:false,});
        const chat = await chatRepo.create({
          type: ChatType.Normal,
          lastMessageNumber: "0",
        });
        mem1.chat = chat;
        mem2.chat = chat;

        await chatRepo.save(chat);
        await membersRepo.save(mem1);
        await membersRepo.save(mem2);

        return chat.id;
      },
    );
    return newChatId;
  }

  async createConsultationChat(
    userId: string,
    title?: string,
    description?: string,
  ): Promise<string> {
    const newChatId = await this.chatRepository.manager.transaction(
      'SERIALIZABLE',
      async ctx => {
        const chatRepo = ctx.getRepository(Chat);
        const membersRepo = ctx.getRepository(ChatMember);

        const mem = membersRepo.create({
          user:{ id: userId },
          isCreator: true,
          type: MemberType.Patient
        });

        const chat = await chatRepo.create({
          type: ChatType.Normal,
          lastMessageNumber: "0",
          status: ChatStatusType.Waiting,
          title,
          description,
        });
        mem.chat = chat;

        await chatRepo.save(chat);
        await membersRepo.save(mem);
        return chat.id
      },
    );
    return newChatId;
  }

  async getChatIds(
    userId: string,
    offset: number = 0,
    limit: number = 128,
  ): Promise<Pick<Chat,'id'>[]> {
    const result: Chat[] = await this.chatRepository.find({
      where:{
        members:[
          { user:{ id: userId }}
        ]
      },
      select:{
        id:true
      },
      skip: offset,
      take: limit,
    });
    return result.map( chat=>({id:chat.id}) );
  }

  async addMember(chatId: string, userId: string) {
    const chatMember = await this.chatRepository.manager.transaction(
      'SERIALIZABLE',
      async ctx => {
        const chatRepo = ctx.getRepository(Chat);
        const membersRepo = ctx.getRepository(ChatMember);

        const chatExsist = await chatRepo.existsBy({ id: chatId });

        if(!chatExsist){
          throw new HttpException("The chat does not exsist or you are not a member of the chat", HttpStatus.FORBIDDEN);
        }

        const newMember = membersRepo.create({
          user: {id:userId},
          chat: {id:chatId}
        });

        return await membersRepo.save(newMember); 
      }
    );
    return chatMember;
  }

  async createMessage(chatId: string, userId: string, text: string) {
    const newMessage = await this.chatRepository.manager.transaction(
      'SERIALIZABLE',
      async ctx => {
        const chatRepo = ctx.getRepository(Chat);
        const membersRepo = ctx.getRepository(ChatMember);
        const messageRepo = ctx.getRepository(Message);

        const isMember = await membersRepo.existsBy({
          user:{id:userId},
          chat:{id:chatId},
        });

        if(!isMember){
          throw new HttpException("The chat does not exsist or you are not a member of the chat", HttpStatus.FORBIDDEN);
        }
        
        const chat = await chatRepo.findOneBy({ id: chatId });
        
        if(!chat){
          throw new HttpException("The chat does not exsist or you are not a member of the chat", HttpStatus.FORBIDDEN);
        }

        const nextNewMessageId = (BigInt(chat.lastMessageNumber) + 1n).toString();
        chat.lastMessageNumber = nextNewMessageId;

        const newMessage = messageRepo.create({
          chatId: chatId,
          id: nextNewMessageId,
          text: text,
        });

        await chatRepo.save(chat);
        return await messageRepo.save(newMessage);
      },
    );
    return newMessage;
  }

  async createMessageQuickly(
    chatId: string,
    userId: string,
    text: string,
  ) {
    const inChat = await this.memberRepository.existsBy({
      user:{id:userId}, chat:{id:chatId},
    });

    if(!inChat){
      throw new HttpException(
        "The chat does not exsist or you are not a member of the chat", 
        HttpStatus.FORBIDDEN
      );
    }

    const newMessage = await this.chatRepository.manager.transaction(
      'SERIALIZABLE',
      async (ctx)=>{
        const result: Message[] = await ctx.query(`
          WITH updated_chat AS (
            UPDATE chats
            SET "lastMessageNumber" = "lastMessageNumber" + 1
            WHERE id = $1
            RETURNING "lastMessageNumber"
          )
          INSERT INTO messages ("id", "chatId", "userId", "text")
          SELECT updated_chat."lastMessageNumber", $1, $2, $3
          FROM updated_chat
          RETURNING "id", "chatId", "userId", "text", "created_at";
        `, [chatId, userId, text]);
        if(result.length !== 1){
          throw Error("createMessageQuickly resultQuery length should be one");
        }
        return result[0];
      }
    );

    return newMessage;
  }
}
