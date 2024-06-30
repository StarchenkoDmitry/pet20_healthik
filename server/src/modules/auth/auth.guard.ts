import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

import { REQ_KEY_USER } from './auth.constant';
import { COOKIE_SESSION_TOKEN_KEY } from 'src/common/constants/session';

import { setCookieSession } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshTokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const sessionToken = request.signedCookies[COOKIE_SESSION_TOKEN_KEY];
    if (!sessionToken) return false;

    const refreshResult = await this.refreshService.checkTokenLifetime(sessionToken);
    if(refreshResult.needToUpdate){
      setCookieSession(response, refreshResult.newToken);
    }

    const user = await this.authService.findOneUserBySessionToken(sessionToken);
    if (!user) return false;

    request[REQ_KEY_USER] = user;
    return true;
  }
}
