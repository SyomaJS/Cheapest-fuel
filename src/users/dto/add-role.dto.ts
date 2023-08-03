import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 2,
    description: "USER'S ID",
  })
  readonly userId: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'ROLE ADMIN',
  })
  readonly value: string;
}
