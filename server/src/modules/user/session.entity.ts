import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User, user => user.sessions, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;
}
