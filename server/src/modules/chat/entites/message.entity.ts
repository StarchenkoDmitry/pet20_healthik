import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../../user/user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @PrimaryColumn({ type: 'uuid' })
  chatId: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
  chat: Chat;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, user => user.myMessages)
  @JoinColumn({ name: "userId", referencedColumnName: 'id'})
  user: User;

  @Column({ type: 'varchar' })
  text: string;

  @CreateDateColumn()
  created_at: Date;
}
