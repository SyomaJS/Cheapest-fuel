import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from './models/user.model';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAutGuard } from '../guards/jwt-auth.guard';
import { UserRoles } from '../roles/models/user-roles.mode';
import { UserSelfGuard } from '../guards/user-self.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Post a new user' })
  @Post()
  async createUser(@Body() creatUserDto: CreateUserDto) {
    return this.usersService.createUser(creatUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of user', type: [User] })
  @UseGuards(JwtAutGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by email address' })
  async getUserByEmail(@Body('email') email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAutGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Add new role to user' })
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add-role')
  async addRole(@Body() addRoledDto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(addRoledDto);
  }

  @ApiOperation({ summary: 'Remove exact role from user ' })
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('remove-role')
  async removeRole(@Body() addRoledDto: AddRoleDto): Promise<User> {
    return this.usersService.removeRole(addRoledDto);
  }

  @ApiOperation({ summary: 'Activate user' })
  @HttpCode(200)
  @Post('activate')
  async activateUser(@Body() activateDto: ActivateUserDto): Promise<User> {
    return this.usersService.activateUser(activateDto);
  }
}
