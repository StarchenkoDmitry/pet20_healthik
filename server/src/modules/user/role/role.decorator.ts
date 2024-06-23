import {
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { AuthGuard } from 'src/modules/auth/auth.guard';

export function Roles(...roles: string[]) {
  if (roles.includes('')) {
    throw Error('A role cannot be empty string');
  }
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}
