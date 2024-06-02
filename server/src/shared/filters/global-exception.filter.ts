import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class GlobalExceptionHandler extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    response.status(500).json({
      message: 'Oops, there here is an error.',
    });
  }
}
