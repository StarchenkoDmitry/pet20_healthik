import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name:"telegram_users"})
export class TelegramUser {
    @PrimaryColumn({ type:"bigint" })
    id: number;

    @Column({ type:"varchar", length: 256 })
    firstName: string;

    @Column("varchar",{ 
        length: 8, 
        default: "en"
    })
    languageCode: string;
}
