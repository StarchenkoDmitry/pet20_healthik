import { Request } from 'express';
import { User } from '../user/user.entity';
import { REQ_KEY_USER } from './auth.constant';
import {
  ExecutionContext,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request[REQ_KEY_USER];
    if (user) {
      return user;
    } else if (user === null) {
      throw new UnauthorizedException();
    } else {
      throw new Error('You must use AuthGuard before using GetUser');
    }
  },
);

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request[REQ_KEY_USER];
    if (user) {
      return user.id;
    } else if (user === null) {
      throw new UnauthorizedException();
    } else {
      throw new Error(
        'You must use AuthGuard before using GetUserId',
      );
    }
  },
);
