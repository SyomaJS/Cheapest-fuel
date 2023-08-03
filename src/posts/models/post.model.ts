import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

interface ICreationPostAttr {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, ICreationPostAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  

  @ApiProperty({ example: 'Sample Post Title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'This is the content of the post.' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    example:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnode%2520js%2F&psig=AOvVaw1_QCkv7xFFgiXqa0JN0qMu&ust=1690347347627000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjF2tuIqYADFQAAAAAdAAAAABAJ',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
