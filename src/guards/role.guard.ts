import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'src/auth/auth.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const requestRoles = this.roles;

    return requestRoles.some((role) => {
      if (role === 'admin') {
        return user.isAdmin;
      }
      if (role === 'employee') {
        return user.isEmployee;
      }
      return false;
    });
  }
}
