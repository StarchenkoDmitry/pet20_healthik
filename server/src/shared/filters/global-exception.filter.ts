import { ArgumentsHost, Catch } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { parseBoolean } from '../utils/parser/boolean-parser';
import { ENABLE_GLOBAL_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN } from 'src/config/env';

@Catch()
export class GlobalExceptionHandler extends BaseExceptionFilter {
  isLogging: boolean;
  
  constructor(private readonly config: ConfigService) {
    super();
    const rowData = this.config.get(ENABLE_GLOBAL_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN);
    this.isLogging = parseBoolean(rowData);
  }
  
  catch(exception: unknown, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    if(this.isLogging){
      console.log("GlobalExceptionHandler catch error:", exception);
    }
    
    response.status(500).json({
      message: 'Oops, there here is an error.',
    });
  }
}
