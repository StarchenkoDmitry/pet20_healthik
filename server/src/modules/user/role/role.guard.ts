import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user.service';
import { Request } from 'express';
import { REQ_KEY_USER } from 'src/modules/auth/auth.constant';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request[REQ_KEY_USER];

    if (user === null) {
      throw new UnauthorizedException();
    } else if (user === undefined) {
      throw new Error('You must use AuthGuard before using RoleGuard or Roles decorator',);
    }

    const roles = this.reflector.get<string[]>('roles',context.getHandler());

    return await this.userService.rolesExists(user.id,roles);
  }
}
