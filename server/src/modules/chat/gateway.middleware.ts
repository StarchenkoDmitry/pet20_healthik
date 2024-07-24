import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Socket, Server } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';

import { IsString } from 'src/shared/utils/string/string-validator';

import { COOKIE_SECRET_TOKEN } from 'src/config/env';
import { COOKIE_SESSION_TOKEN_KEY } from 'src/common/constants/session';

import { UserSocket } from './chat.interface';
import { AuthService } from '../auth/auth.service';


export type GatewayMiddleware = (
  socket: UserSocket,
  next: (err?: ExtendedError) => void,
) => void;

@Injectable()
export class GatewayGuard {

  private COOKIE_SECRET: string;

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    const rowCookieSecret = config.get(COOKIE_SECRET_TOKEN);
    if(!IsString(rowCookieSecret)){
      throw new Error("GatewayGuard rowCookieSecret(from env.COOKIE_SECRET_TOKEN) must be of type string");
    }
    this.COOKIE_SECRET = rowCookieSecret;
  }

  add(socket: Server) {
    socket.use(this.guard);
  }

  private getSessionToken(socket: Socket): string | undefined {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) return;

    const parsedCookies = cookie.parse(cookies);
    const sessionToken = parsedCookies[COOKIE_SESSION_TOKEN_KEY];
    const session = cookieParser.signedCookie(sessionToken,this.COOKIE_SECRET);

    if(session === false) return
    return session;
  }

  private guard: GatewayMiddleware = async (socket, next) => {
    console.log('GatewayGuard new connect');

    const sessionToken = this.getSessionToken(socket);

    if(!sessionToken){
      next({
        name: 'unauthorized exception',
        message: 'unauthorized exception: sessionToken is null'
      });
      return;
    }

    const user = await this.authService.findOneUserBySessionToken(sessionToken);
    if(!user){
      next({
        name: 'unauthorized exception',
        message: 'unauthorized exception: sessionToken is not valid'
      });
      return;
    }

    socket.user = user;
    socket.userId = user.id;
    socket.userSessionToken = sessionToken;
    next();
  };
}
