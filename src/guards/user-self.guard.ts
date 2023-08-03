import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

  @Injectable()
  export class UserSelfGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();

      if (String(req.user.id) !== req.params.id) {
        throw new ForbiddenException({
          message: 'Not allowed User ...',
        });
      }

      return true;
    }
  }
