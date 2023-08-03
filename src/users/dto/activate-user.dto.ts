import { ApiProperty } from '@nestjs/swagger';

export class ActivateUserDto {
  @ApiProperty({
    example: 2,
    description: 'Users id',
  })
  userId: number;
}
