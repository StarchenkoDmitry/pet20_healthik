import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  comparePassword,
  generateRandomSessionToken,
  hashPassword,
} from './auth.utils';
import { Session } from '../user/session/session.entity';
import {
  CreateSessionResult,
  LogOutResult,
  SignInResult,
  SignUpResult,
  UserAndSessionResult,
} from './auth.interface';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { TOKEN_LIFETIME, TOKEN_UPDATE_TIME } from 'src/config/auth';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly refreshService: RefreshTokenService,
  ) {}

  async signUp(userDto: SignUpDto): Promise<SignUpResult> {
    try {
      const userExisted = await this.userRepository.findOneBy({
        email: userDto.email,
      });
      if (userExisted) {
        return { _t: 'failed' };
      }
      const user = this.userRepository.create({
        name: userDto.name,
        email: userDto.email,
        password: await hashPassword(userDto.password),
      });
      const res = await this.userRepository.save(user);
      return { _t: 'success', user: res };
    } catch (error) {
      return { _t: 'failed' };
    }
  }

  async signIn(userDto: SignInDto): Promise<SignInResult> {
    const user = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (!user) return { _t: 'user-not-found' };

    const compared = comparePassword(userDto.password, user.password);
    if (!compared) return { _t: 'incorrect-password' };

    const newSession = await this.createSession(user);
    if (newSession._t === 'seccess') {
      return { _t: 'seccess', token: newSession.token };
    } else {
      return { _t: 'token-creation-error' };
    }
  }

  async logout(session: string): Promise<LogOutResult> {
    const res = await this.sessionRepository.delete({
      token: session,
    });
    return { logOuted: (res.affected ?? 0) > 0 };
  }

  async createSession(user: User): Promise<CreateSessionResult> {
    try {
      const newSession = new Session();
      newSession.user = user;
      newSession.createdAt = new Date();
      newSession.expiresIn = new Date(+new Date() + TOKEN_LIFETIME);
      newSession.token = generateRandomSessionToken();
      const saved = await this.sessionRepository.save(newSession);
      return { _t: 'seccess', token: saved.token };
    } catch (error) {
      return { _t: 'failed' };
    }
  }

  async findOneUserBySessionToken(token: string) {
    return await this.userRepository.findOneBy({
      sessions: { token },
    });
  }

  async createSessionByUserId(
    userId: string,
  ): Promise<CreateSessionResult> {
    try {
      const user = new User();
      user.id = userId;
      const newSession = new Session();
      newSession.user = user;
      newSession.createdAt = new Date();
      newSession.expiresIn = new Date(+new Date() + TOKEN_LIFETIME);
      newSession.token = generateRandomSessionToken();
      const saved = await this.sessionRepository.save(newSession);
      return { _t: 'seccess', token: saved.token };
    } catch (error) {
      return { _t: 'failed' };
    }
  }

  async isEmailRegistered(email: string) {
    return await this.userRepository.existsBy({ email });
  }

  async getUserAndRefreshSession(
    currentToken: string,
  ): Promise<UserAndSessionResult> {
    const session = await this.sessionRepository.findOne({
      where: { token: currentToken },
      relations: { user: true },
    });

    if (!session) {
      return { type: 'token-not-found' };
    }

    const user = session.user;

    const now = new Date();

    if (+session.expiresIn < +now) {
      return { type: 'token-not-found' };
    }

    if (+session.createdAt + TOKEN_UPDATE_TIME < +now) {
      const refreshResult = await this.refreshService.refreshToken(
        user.id,
        currentToken,
      );
      return {
        type: 'token-refresh',
        user,
        newToken: refreshResult.newToken,
      };
    }

    return {
      type: 'normal',
      user,
    };
  }
}
