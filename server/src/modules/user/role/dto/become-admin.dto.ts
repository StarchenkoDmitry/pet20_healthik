import { Length } from 'class-validator';
import {
  MAX_ADMIN_SECRET_LENGTH,
  MIN_ADMIN_SECRET_LENGTH,
} from 'src/config/role';

export class BecomeAdminDto {
  @Length(MIN_ADMIN_SECRET_LENGTH, MAX_ADMIN_SECRET_LENGTH)
  secret!: string;
}
