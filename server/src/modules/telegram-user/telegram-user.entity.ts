import { Column, Entity, PrimaryColumn } from 'typeorm';
import { HandlerNamesType } from '../handler/handler-name-list';

@Entity({ name: 'telegram_users' })
export class TelegramUser {
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar', length: 256 })
  firstName: string;

  @Column({ type: "varchar", length: 8 })
  languageCode: string;
  
  @Column("varchar",{ length: 256 })
  currentHandler: HandlerNamesType;
}
