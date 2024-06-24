import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BecomeAdminDto } from './dto/become-admin.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { BecomeAdminResponse } from 'src/common/types/role';
import { RoleService } from './role.service';
import { User } from '../user.entity';
import { GetUser } from 'src/modules/auth/auth.decorator';

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('become-admin')
  @UseGuards(AuthGuard)
  async toBeAdmin(
    @Body() dto: BecomeAdminDto,
    @GetUser() user: User,
  ): Promise<BecomeAdminResponse> {
    return await this.roleService.becomeAdmin(user.id, dto.secret);
  }
}
