import { Controller } from '@nestjs/common';
import { TelegramMessageService } from './telegram-message.service';

@Controller('telegram-message')
export class TelegramMessageController {
  constructor(
    private readonly telegramMessageService: TelegramMessageService,
  ) {}
}
