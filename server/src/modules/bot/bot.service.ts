import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    throw new Error('Method not implemented.');
  }
}
