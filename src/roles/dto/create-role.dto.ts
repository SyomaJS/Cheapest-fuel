import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Thats admin you know?',
  })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({
    example: 'Some info Role',
    description: 'Info about role',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
