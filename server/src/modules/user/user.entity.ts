import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Session } from './session/session.entity';
import { Role } from './role/role.entity';

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

  @OneToMany(type => Session, session => session.user)
  sessions: Session[];
}
