import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Session } from './session/session.entity';
import { Role } from './role/role.entity';
import { RoleChange } from './role-change/role-change.entity';
import { AdminRoleChange } from './admin-role-changes/role-change.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 256 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(type => Role, role => role.user)
  roles: Role[];

  @OneToMany(type => RoleChange, roleChange => roleChange.user)
  roleChanges: RoleChange[];

  @OneToMany(type => AdminRoleChange, adminRoleChange => adminRoleChange.user)
  adminRoleChanges: AdminRoleChange[];

  @OneToMany(type => Session, session => session.user)
  sessions: Session[];
}
