import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'telegram_messages' })
export class TelegramMessage {
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar', nullable:true })
  text: string | null | undefined;
  
  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;
}
