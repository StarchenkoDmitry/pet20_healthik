import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

import { REQ_KEY_USER } from './auth.constant';
import { COOKIE_SESSION_TOKEN_KEY } from 'src/common/constants/session';

import { setCookieSession } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const sessionToken = request.signedCookies[COOKIE_SESSION_TOKEN_KEY];
    if (!sessionToken) return false;

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
