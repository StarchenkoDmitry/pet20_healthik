import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

import { REQ_KEY_USER } from './auth.constant';

import { getCookieSession, setCookieSession } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const sessionToken = getCookieSession(request);
    if (!sessionToken) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.getUserAndRefreshSession(sessionToken);

    if(result.type === "token-not-found"){
      throw new UnauthorizedException();
    }

    if(result.type === "token-expired"){
      throw new UnauthorizedException('the token is lifetime has expired');
    }

    if(result.type === "token-refresh"){
      setCookieSession(response, result.newToken);
    }

    request[REQ_KEY_USER] = result.user;
    return true;
  }
}
