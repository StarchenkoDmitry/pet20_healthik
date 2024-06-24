import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ConfigService } from '@nestjs/config';
import { BecomeAdminResult } from './role.interface';
import { ADMIN_ROLE } from 'src/common/constants/role';
import { RoleChange } from '../role-change/role-change.entity';
import { AdminRoleChange } from '../admin-role-changes/role-change.entity';
import {
  MAX_ADMIN_SECRET_LENGTH,
  MIN_ADMIN_SECRET_LENGTH,
} from 'src/config/role';

@Injectable()
export class RoleService {
  private ADMIN_SECRET: string;
  private ENABLE_ADMIN_SECRET: boolean;

  constructor(
    private readonly config: ConfigService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {
    this.ADMIN_SECRET = config.get('ADMIN_SECRET') ?? '';
    this.ENABLE_ADMIN_SECRET = config.get('ENABLE_ADMIN_SECRET') === 'True';

    if (this.ENABLE_ADMIN_SECRET && (
      this.ADMIN_SECRET.length > MAX_ADMIN_SECRET_LENGTH ||
      this.ADMIN_SECRET.length < MIN_ADMIN_SECRET_LENGTH || 
      this.ADMIN_SECRET === '')
    ) {
      throw Error("The ADMIN_SECRET doesn't match the length.");
    }
  }

  async becomeAdmin(
    userId: string,
    secret: string,
  ): Promise<BecomeAdminResult> {
    if (!this.ENABLE_ADMIN_SECRET) {
      return { type: 'failed' };
    }
    if (secret !== this.ADMIN_SECRET || this.ADMIN_SECRET === '') {
      return { type: 'wrong-secret' };
    }

    try {
      const result = await this.entityManager.transaction(
        'SERIALIZABLE',
        async ts => {
          const exsisted = await ts.exists(Role, {
            where: {
              user: { id: userId },
              role: ADMIN_ROLE,
            },
          });

          if (exsisted) {
            return 'already-admin';
          }

          const newRole = ts.create(Role, {
            user: { id: userId },
            role: ADMIN_ROLE,
          });

          const newRoleChange = ts.create(RoleChange, {
            user: { id: userId },
            roleName: ADMIN_ROLE,
            isAdded: true,
          });

          const newAdminRoleChange = ts.create(AdminRoleChange, {
            user: { id: userId },
            isAdded: true,
            secret: this.ADMIN_SECRET,
          });

          await ts.save(newRole);
          await ts.save(newRoleChange);
          await ts.save(newAdminRoleChange);

          return 'success';
        },
      );
      return { type: result };
    } catch (error) {
      console.error('RoleService.becomeAdmin error:', error);
      return { type: 'failed' };
    }
  }
}
