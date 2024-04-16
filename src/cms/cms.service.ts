import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CmsService {
  constructor(private authService: AuthService) {}

  async createCMSUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdmin: boolean,
    isEmployee: boolean,
  ) {
    return await this.authService.createCMSUser(
      email,
      firstName,
      lastName,
      password,
      isAdmin,
      isEmployee,
    );
  }
  async signInCMS(email: string, password: string) {
    const accessToken = await this.authService.signInCMS(email, password);
    return accessToken;
  }

  async activateUser(userId: string) {
    await this.authService.activateUser(userId);
  }

  async deactivateUser(userId: string) {
    await this.authService.deactivateUser(userId);
  }

  async getCMSUsersPaginated(page: number, limit: number) {
    return this.authService.getCMSUsersPaginated(page, limit);
  }

  async getUserDetails(userId: string) {
    return this.authService.getUserDetails(userId);
  }

  async makeUserAdmin(userId: string){
    await this.authService.makeUserAdmin(userId);
  }

  
}

