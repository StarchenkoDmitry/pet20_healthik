import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TelegramUser } from './telegram-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TelegramUserService {
  constructor(
    @InjectRepository(TelegramUser)
    private readonly telegramUsersRepository: Repository<TelegramUser>,
  ) { }

  async findOne(id:number){
    return await this.telegramUsersRepository.findOneBy({id});
  }

  async save(telegramUser: TelegramUser){
    await this.telegramUsersRepository.save(telegramUser);
  }
}
