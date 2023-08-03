import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTHENTICATION')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @Post('/registeration')
  @ApiOperation({ summary: 'REGISTERATION NEW USER' })
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post('/login')
  @ApiOperation({ summary: 'LOGGIN IN' })
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
}
