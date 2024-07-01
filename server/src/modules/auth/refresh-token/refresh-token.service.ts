import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  RefreshResult,
  RefreshTokenTask,
  RefreshID,
  RefreshTokenPromise,
} from './refresh-token.interface';
import { CACHE_CLEAR_TIME } from './refresh-token.constants';

@Injectable()
export class RefreshTokenService
  implements OnModuleInit, OnModuleDestroy
{
  cacheHandler: NodeJS.Timeout;
  refreshTasks = new Map<RefreshID, RefreshTokenTask>();

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private cacheProcess() {
    const keysForDelete: string[] = [];
    const now = new Date().getTime() - CACHE_CLEAR_TIME;
    this.refreshTasks.forEach((value, key) => {
      if (value.lastUsed.getTime() < now) {
        keysForDelete.push(key);
      }
    });
    keysForDelete.forEach(key => this.refreshTasks.delete(key));
  }

  onModuleInit() {
    this.cacheHandler = setInterval(() => this.cacheProcess(), CACHE_CLEAR_TIME);
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

  private createOrGetTask(
    userId: string,
    currentToken: string,
  ): RefreshTokenTask {
    const taskId: RefreshID = `${userId}/${currentToken}`;

    let foundTask = this.refreshTasks.get(taskId);
    if (foundTask) return foundTask;

    const newTask: RefreshTokenTask = {
      lastUsed: new Date(),
      isCompleted: false,
      process: this.refreshTask(userId),
    };
    newTask.process.finally(() => {
      newTask.isCompleted = true;
    });
    this.refreshTasks.set(taskId, newTask);
    return newTask;
  }

  async refreshToken(
    userId: string,
    currentToken: string,
  ): RefreshTokenPromise {
    let task = this.createOrGetTask(userId, currentToken);
    const newToken = await task.process;
    task.lastUsed = new Date();
    return newToken;
  }
}
