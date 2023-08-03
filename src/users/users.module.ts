import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/models/role.model';
import { User } from './models/user.model';
import { UserRoles } from '../roles/models/user-roles.mode';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/models/post.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles, Post]),
    RolesModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
