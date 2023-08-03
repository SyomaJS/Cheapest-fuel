import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRopository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(creatUserDto: CreateUserDto) {
    const newUser = await this.userRopository.create(creatUserDto);
    const role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) throw new BadRequestException('Role not found !'); //!        ERROR

    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRopository.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRopository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRopository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto): Promise<User> {
    const user = await this.userRopository.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      const updatedUser = await this.userRopository.findByPk(
        addRoleDto.userId,
        { include: { all: true } },
      );
      return updatedUser;
    }

    throw new NotFoundException('User or role not found');
  }

  async removeRole(addRoleDto: AddRoleDto): Promise<User> {
    const user = await this.userRopository.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('role', role.id);
      const updatedUser = await this.userRopository.findByPk(
        addRoleDto.userId,
        { include: { all: true } },
      );
      return updatedUser;
    }

    throw new NotFoundException('User or role not found');
  }

  async activateUser(userDto: ActivateUserDto): Promise<User> {
    const user = await this.userRopository.findByPk(userDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.is_active = true;
    user.save();
    return user;
  }
}
