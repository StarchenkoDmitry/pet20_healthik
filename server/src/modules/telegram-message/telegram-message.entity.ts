import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'telegram_messages' })
export class TelegramMessage {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 256 })
  text: string;
  
  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;
}
