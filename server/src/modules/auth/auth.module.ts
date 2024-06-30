import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Session } from '../user/session/session.entity';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenService],
  exports: [AuthService, RefreshTokenService],
})
export class AuthModule {}
