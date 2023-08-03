import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles API')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'CREATE ROLE' })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'GET ALL ROLES' })
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':value')
  @ApiOperation({ summary: 'GET ROLE BY VALUE' })
  async getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
