import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/authentication.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard) 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  @Get('complaint-categories')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getAllComplaintCategories(){
    return await this.adminService.getAllComplaintCategories();
  }

  @Get('complaint-categories/:id')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getComplaintCategoryById(@Param('id') id: string) {
    return await this.adminService.getComplaintCategoryById(id);
  }

  @Post('complaint-categories')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async createComplaintCategory(@Body() body: { name: string }) {
    return await this.adminService.createComplaintCategory(body.name);
  }

  @Put('complaint-categories/:id')
  @UseGuards(new RoleGuard(['admin']))
  async updateComplaintCategory(
    @Param('id') id: string,
    @Body() body: { name: string },
  ) {
    return await this.adminService.updateComplaintCategory(id, body.name);
  }

  @Delete('complaint-categories/:id')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async deleteComplaintCategory(@Param('id') id: string) {
    await this.adminService.deleteComplaintCategory(id);
  }

  // Complaint Routes
  @Get('complaints')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getAllComplaints() {
    return await this.adminService.getAllComplaints();
  }

  @Get('complaints/:id')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async getComplaintById(@Param('id') id: string) {
    return await this.adminService.getComplaintById(id);
  }

  @Put('complaints/:id/update-status')
  @UseGuards(new RoleGuard(['admin', 'employee']))
  async updateComplaintStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
   ) {
    return await this.adminService.updateComplaintStatus(id, body.status);
  }
}
