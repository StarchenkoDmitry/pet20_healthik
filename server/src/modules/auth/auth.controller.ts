import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import {
  clearCookieSession,
  getCookieSession,
  setCookieSession,
} from './auth.utils';
import {
  LogoutResponse,
  SignInResponse,
  SignUpResponse,
} from 'src/common/types/auth';
import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signUpData: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponse> {
    const singupResult = await this.authService.signUp(signUpData);

    if (singupResult._t === 'failed') {
      throw new HttpException(
        "i don't know what happened.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newSessionToken = await this.authService.createSession(
      singupResult.user,
    );

    if (newSessionToken._t === 'seccess') {
      setCookieSession(res, newSessionToken.token);
      return { id: singupResult.user.id };
    } else {
      throw new HttpException(
        "i don't know what happened.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  async signin(
    @Body() signInData: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponse> {
    const newSessionToken = await this.authService.signIn(signInData);

    if (newSessionToken && newSessionToken._t === 'seccess') {
      setCookieSession(res, newSessionToken.token);
      return true;
    }
    return false;
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutResponse> {
    const sessionToken = getCookieSession(req);
    if (!sessionToken) {
      throw new UnauthorizedException();
    }

    const isLoggedOut = await this.authService.logout(sessionToken);
    clearCookieSession(res);

    return isLoggedOut.logOuted;
  }
}
