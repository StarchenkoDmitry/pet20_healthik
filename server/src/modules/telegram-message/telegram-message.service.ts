import { Injectable } from '@nestjs/common';
import { TelegramMessage } from './telegram-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramMessageService {
  constructor(
    @InjectRepository(TelegramMessage)
    private readonly telegramMessageRepository: Repository<TelegramMessage>,
  ) {}

  async save(message: TelegramMessage) {
    try {
      await this.telegramMessageRepository.save(message);
      return true;
    } catch (error) {
      console.log('TelegramMessageService.save error:', error);
      return false;
    }
  }

  async findOne(id: number): Promise<TelegramMessage | undefined> {
    try {
      const res = await this.telegramMessageRepository.findOneBy({
        id,
      });
      return res ?? undefined;
    } catch (error) {
      console.log('TelegramMessageService.findOne error:', error);
      return undefined;
    }
  }
}
