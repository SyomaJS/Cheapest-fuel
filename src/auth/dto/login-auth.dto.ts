import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'akramov@mail.ru',
    description: "User's email address",
  })
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: "User's password",
  })
  readonly password: string;  
}
