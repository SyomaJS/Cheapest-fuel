import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: "User's name",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user1@mail.ru',
    description: "User's email address",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456JKL',
    description: "User's password",
  })
  // @IsStrongPassword({ minLength: 6 }) // Thats good tester passwords
  password: string;
}
