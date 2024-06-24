import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity({ name: 'role_changes' })
export class RoleChange {
  @PrimaryColumn({ type: 'bigint', generated: 'increment' })
  id: string;

  @Column({ type: 'boolean' })
  isAdded: boolean;

  @Column({ type: 'varchar', length: 256 })
  roleName: string;

  @ManyToOne(type => User, user => user.roleChanges)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
