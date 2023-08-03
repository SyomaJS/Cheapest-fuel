import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from './user-roles.mode';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/user.model';

interface RolesCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User's ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @ApiProperty({
    example: 'ROLES',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  value: string;

  @ApiProperty({
    example: 'Admin roles',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
