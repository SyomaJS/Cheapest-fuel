import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = await this.roleRepository.create(createRoleDto);
    return newRole;
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.findAll({ include: { all: true } });
    return roles;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
