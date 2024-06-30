import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../user/session/session.entity';
import { AuthService } from '../auth.service';
import {
  CheckTokenLifetimeResult,
  RefreshResult,
  RefreshTokenTask,
  RefreshID,
  RefreshTokenPromise,
} from './refresh-token.interface';
import { CACHE_CLEAR_TIME } from './refresh-token.constants';
import { TOKEN_UPDATE_TIME } from 'src/config/auth';


@Injectable()
export class RefreshTokenService
  implements OnModuleInit, OnModuleDestroy
{
  cacheHandler: NodeJS.Timeout;
  refreshTasks = new Map<RefreshID, RefreshTokenTask>();

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly authService: AuthService,
  ) {}

  private cacheProcess() {
    const keysForDelete: string[] = [];
    const now = new Date().getTime() - CACHE_CLEAR_TIME;
    this.refreshTasks.forEach((value, key, mapa) => {
      if (value.lastUsed.getTime() < now) {
        keysForDelete.push(key);
      }
    });
    keysForDelete.forEach(key => this.refreshTasks.delete(key));
  }

  onModuleInit() {
    this.cacheHandler = setInterval(()=>this.cacheProcess(), CACHE_CLEAR_TIME);
  }

  onModuleDestroy() {
    clearInterval(this.cacheHandler);
  }

  private async refreshTask(userId: string): Promise<RefreshResult> {
    const newSession =
      await this.authService.createSessionByUserId(userId);
    if (newSession._t !== 'seccess') {
      throw new Error('refreshTask is failed');
    }
    return { newToken: newSession.token };
  }

  private CreateOrGetTask(
    userId: string,
    oldToken: string,
  ): RefreshTokenTask {
    const taskId: RefreshID = `${userId}-${oldToken}`;

    let foundTask = this.refreshTasks.get(taskId);
    if (foundTask) return foundTask;

    const newTask: RefreshTokenTask = {
      userId,
      oldToken,
      newToken: '',
      lastUsed: new Date(),
      isCompleted: false,
      process: this.refreshTask(userId),
    };
    newTask.process.then(result => {
      newTask.newToken = result.newToken;
    }).finally(()=>{
      newTask.isCompleted = true;
    });
    this.refreshTasks.set(taskId, newTask);
    return newTask;
  }

  async refresh(
    userId: string,
    oldToken: string,
  ): RefreshTokenPromise {
    let task = this.CreateOrGetTask(userId, oldToken);
    const newToken = await task.process;
    task.lastUsed = new Date();
    return newToken;
  }

  async checkTokenLifetime(
    currentToken: string
  ): Promise<CheckTokenLifetimeResult> {
    const session = await this.sessionRepository.findOne({
      where: { token: currentToken },
      select: { user:{ id:true } },
      relations: { user:true }
    });

    if (!session) throw new UnauthorizedException();

    const now = new Date();

    if (session.expiresIn.getTime() < now.getTime()) {
      throw new UnauthorizedException('the token is lifetime has expired',);
    }

    if (session.createdAt.getTime() + TOKEN_UPDATE_TIME < now.getTime()) {
      const refreshResult = await this.refresh(session.user.id, currentToken);
      return {
        needToUpdate: true,
        newToken: refreshResult.newToken
      };
    } else {
      return { needToUpdate: false };
    }
  }
}
