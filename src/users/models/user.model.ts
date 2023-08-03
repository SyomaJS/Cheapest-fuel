import { ApiProperty } from '@nestjs/swagger';

import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/models/role.model';
import { UserRoles } from '../../roles/models/user-roles.mode';
import { Post } from '../../posts/models/post.model';

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Yunusbek',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @ApiProperty({
    example: 'yunusbek@mail.ru',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: ['ADMIN'],
  })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
