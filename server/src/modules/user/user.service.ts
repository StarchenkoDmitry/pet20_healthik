import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByToken(token: string) {
    return await this.userRepository.findOne({
      where: {
        sessions: { token },
      },
    });
  }

  async getRoles(userId: string, take: number = 99) {
    return await this.roleRepository.find({
      where: {
        user: { id: userId },
      },
      take: take,
    });
  }

  async rolesExists(userId: string, roles: string[]): Promise<boolean> {
    const rolesExist = await Promise.all(roles.map(role=>{
      return this.roleRepository.existsBy({
        role,
        user:{id:userId}
      });
    }));
    return rolesExist.every((esixted)=>esixted);
  }

  async setRole(userId: string, roleName: string) {
    const role = this.roleRepository.create({
      role: roleName,
      user: { id: userId },
    });
    return await this.roleRepository.save(role);
  }

  async deleteRole(userId: string, roleName: string) {
    await this.roleRepository.delete({
      role: roleName,
      user: { id: userId },
    });
  }
}
