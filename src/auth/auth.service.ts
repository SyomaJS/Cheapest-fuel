import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        `This user has already been registered `,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userService.createUser({
      ...userDto,
      password: bcrypt.hashSync(userDto.password, 7),
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new NotFoundException('User not found ');
    }
    return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginAuthDto) {
    console.log(loginDto);

    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password ');
    }

    const validPassword = await bcrypt.compare(loginDto.password, user.password);
    if (validPassword) {
      return user;
    }
    
    console.log(loginDto);


    throw new UnauthorizedException('Wrong email or password ');
  }
}
