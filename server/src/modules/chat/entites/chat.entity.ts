import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { ChatMember } from './chat-member.entity';
import { ChatStatusType, ChatType } from '../../../common/enum/chat.enum';
import { 
  MAX_DESCRIPTION_LENGTH, 
  MAX_TITLE_LENGTH 
} from 'src/common/constants/chat';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: MAX_TITLE_LENGTH, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: MAX_DESCRIPTION_LENGTH, nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: ChatType,
    default: ChatType.Normal,
  })
  type: ChatType;
  
  @Column({
    type: "enum",
    enum: ChatStatusType,
    default: ChatStatusType.None,
  })
  status: ChatStatusType;

  @Column({ type: 'bigint' })
  lastMessageNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ChatMember, mem => mem.chat)
  members: ChatMember[];

  @OneToMany(() => Message, mes => mes.chat)
  messages: Message[];
}
