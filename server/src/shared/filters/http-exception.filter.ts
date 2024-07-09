import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { parseBoolean } from '../utils/parser/boolean-parser';
import { ENABLE_HTTP_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN } from 'src/config/env';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  isLogging: boolean;
  
  constructor(private readonly config: ConfigService) {
    const rowData = this.config.get(ENABLE_HTTP_EXCEPTION_LOGGING_IN_CONSOLE_TOKEN);
    this.isLogging = parseBoolean(rowData);
  }
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.getResponse();

    if(this.isLogging){
      console.log("HttpExceptionFilter catch error:", exception);
    }

    response.status(status).json(message);
  }
}
