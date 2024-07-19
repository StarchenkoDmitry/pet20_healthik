import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/modules/user/user.entity';
import { MemberType } from 'src/common/enum/member.enum';

@Entity({ name: 'chat_members' })
export class ChatMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat, chat => chat.members)
  chat: Chat;

  @ManyToOne(() => User, user => user.myMembers)
  user: User;

  @Column({ type: 'boolean', default: false })
  isCreator: boolean;

  @Column({
    type: 'enum',
    enum: MemberType,
    default: MemberType.None,
  })
  type: MemberType;

  @CreateDateColumn()
  createdAt: Date;
}
