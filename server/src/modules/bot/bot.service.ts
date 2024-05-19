import { RunnerHandle, run } from '@grammyjs/runner';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { MainContext } from './bot.interface';
import { ConfigService } from '@nestjs/config';
import { enableTranslator } from './helpers/translator.middleware';
import { enableSequentionlize } from './helpers/sequentionlize.middleware';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly bot: Bot<MainContext>;
  private handler: RunnerHandle;

  constructor(private readonly config: ConfigService) {
    const telegramToken = config.get('TELEGRAM_TOKEN');

    if (!telegramToken) throw Error('TELEGRAM_TOKEN is not exist');

    this.bot = new Bot<MainContext>(telegramToken);
    this.bot.use(enableSequentionlize());
    this.bot.use(enableTranslator());

    this.bot.on('message', async ctx => {
      await ctx.reply(
        ctx.t('start-welcome') + `, name: ${ctx.from.first_name}`,
      );
    });

    this.handler = run(this.bot);
  }

  onModuleInit() {}
}
