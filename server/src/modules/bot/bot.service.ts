import { RunnerHandle, run } from '@grammyjs/runner';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { MainContext } from './bot.interface';
import { ConfigService } from '@nestjs/config';
import { enableTranslator } from './helpers/translator.middleware';
import { enableSequentionlize } from './helpers/sequentionlize.middleware';
import { enableSession } from './helpers/session.middleware';
import { TelegramUserService } from '../telegram-user/telegram-user.service';
import { enableMessageHistory } from './helpers/messageHistory.middleware';
import { TelegramMessageService } from '../telegram-message/telegram-message.service';
import { enableExtensionContext } from './helpers/extensionContext.middleware.';
import { startCommand } from './commands/start.command';
import { restartCommand } from './commands/restart.command';
import { mainMessageHandler } from '../handler/main-handler';
import { TelegramMessage } from '../telegram-message/telegram-message.entity';
import { TelegramUser } from '../telegram-user/telegram-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly bot: Bot<MainContext>;
  private handler: RunnerHandle;

  constructor(
    private readonly config: ConfigService,
    private readonly telegramUserService: TelegramUserService,
    private readonly telegramMessageService: TelegramMessageService,

    @InjectRepository(TelegramMessage)
    private readonly telegramMessageRepository: Repository<TelegramMessage>,
    @InjectRepository(TelegramUser)
    private readonly telegramUsersRepository: Repository<TelegramUser>,
  ) {
    const telegramToken = config.get('TELEGRAM_TOKEN');

    if (!telegramToken) throw Error('TELEGRAM_TOKEN is not exist');

    this.bot = new Bot<MainContext>(telegramToken);

    this.bot.use(enableSequentionlize());
    this.bot.use(enableSession(telegramUserService));
    this.bot.use(enableTranslator());
    this.bot.use(
      enableExtensionContext({
        repositories: [
          telegramMessageRepository,
          telegramUsersRepository,
        ],
      }),
    );
    this.bot.use(enableMessageHistory(telegramMessageService));

    this.bot.command('start', startCommand);
    this.bot.command('restart', restartCommand);
    this.bot.on('message', mainMessageHandler);

    this.handler = run(this.bot, {
      runner: {
        // silent:true,
      },
    });
  }

  onModuleInit() {}
}
