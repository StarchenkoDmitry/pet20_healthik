import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity({ name: 'admin_role_changes' })
export class AdminRoleChange {
  @PrimaryColumn({ type: 'bigint', generated: 'increment' })
  id: string;

  @Column({ type: 'boolean' })
  isAdded: boolean;

  @Column({ type: 'varchar', nullable: true })
  secret: string;

  @ManyToOne(type => User, user => user.adminRoleChanges)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
