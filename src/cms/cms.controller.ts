import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import { AddCmsUserDto } from './dto/addUserCms.dto';
import { CMSLoginDto } from './dto/signinCms.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from 'src/guards/authentication.guard';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('signup')
  @UseGuards(new RoleGuard(['admin']))
  async addCmsUser(@Body() addCmsUserDto: AddCmsUserDto): Promise<void> {
    await this.cmsService.createCMSUser(
      addCmsUserDto.email,
      addCmsUserDto.firstName,
      addCmsUserDto.lastName,
      addCmsUserDto.password,
      addCmsUserDto.isAdmin,
      addCmsUserDto.isEmployee,
    );
  }

  @Post('signin')
  @UseGuards(JwtAuthGuard)
  async signInCMS(@Body() cmsLoginDto: CMSLoginDto) {
    const accessToken = await this.cmsService.signInCMS(
      cmsLoginDto.email,
      cmsLoginDto.password,
    );
    return { accessToken };
  }

  @Post('activate-user/:userId')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async activateUser(@Param('userId') userId: string) {
    await this.cmsService.activateUser(userId);
  }

  @Post('deactivate-user/:userId')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async deactivateUser(@Param('userId') userId: string) {
    await this.cmsService.deactivateUser(userId);
  }

  @Get('users')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getCMSUsersPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.cmsService.getCMSUsersPaginated(page, limit);
  }

  @Get('user-details/:userId')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getUserDetails(@Param('userId') userId: string) {
    return this.cmsService.getUserDetails(userId);
  }

  @Post('make-admin/:userId')
  @UseGuards(new RoleGuard(['admin']))
  async makeUserAdmin(@Param('userId') userId: string) {
    await this.cmsService.makeUserAdmin(userId);
  }
}
