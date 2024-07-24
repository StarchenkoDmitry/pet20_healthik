import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

import { parseBoolean } from '../utils/parser/boolean-parser';
import { ENABLE_GLOBAL_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN } from 'src/config/env';

@Catch()
export class AllWsExceptionsFilter  extends BaseWsExceptionFilter  {
  isLogging: boolean;
  
  constructor(private readonly config: ConfigService) {
    super();
    const rowData = this.config.get(ENABLE_GLOBAL_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN);
    this.isLogging = parseBoolean(rowData);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if(this.isLogging){
      console.log(`AllWsExceptionsFilter catch error`, exception);
    }
    const socket = host.switchToWs().getClient<Socket>();
    socket.disconnect(true);
  }
}
