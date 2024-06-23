import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User, user => user.roles, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;
}
