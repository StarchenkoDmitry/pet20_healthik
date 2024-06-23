import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeResponse } from 'src/common/types/user';
import { GetUser, GetUserId } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.entity';
import { Roles } from './role/role.decorator';

@Controller('user')
export class UserController {
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@GetUser() user: User): Promise<MeResponse> {
    const { id, name, email, createdAt } = user;
    return { id, name, email, createdAt };
  }

  @Get('me/id')
  @UseGuards(AuthGuard)
  async getMeId(@GetUserId() userId): Promise<{ id: string }> {
    return { id: userId };
  }

  @Get('me/is-admin')
  @Roles('admin')
  async amIAdmin() {}

  /**
   * This handler waa added for fun
   */
  @Get('me/is-dog')
  @Roles('dog')
  async isDog() {}
}
