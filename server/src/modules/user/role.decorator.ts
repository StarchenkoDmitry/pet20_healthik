import {
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from './role.guard';

export function Roles(...roles: string[]) {
  if (roles.includes('')) {
    throw Error('A role cannot be empty string');
  }
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}
