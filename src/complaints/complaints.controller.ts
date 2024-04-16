import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { SubmitComplaintDto } from './dto/create-complaint.dto';
import { PaginateComplaintsDto } from './dto/paginated.dto';
import { JwtAuthGuard } from 'src/guards/authentication.guard';

//@UseGuards(JwtAuthGuard)
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}
  @Get('grouped')
  async getComplaintsGroupedByStatus(@Request() req: any) {
    const userId = req.user.id; 
    return await this.complaintsService.getComplaintsGroupedByStatus(userId);
  }

  @Post('submit')
  async submitComplaint(
    @Body() submitComplaintDto: SubmitComplaintDto,
    @Request() req: any,
  ) {
    const { title, body, complaintCategoryId } = submitComplaintDto;
    const userId = req.user.id; 
    return await this.complaintsService.submitComplaint(
      userId,
      title,
      body,
      complaintCategoryId,
    );
  }

  @Get('my-complaints')
  async getMyComplaints(@Query() paginateComplaintsDto: PaginateComplaintsDto, @Request() req: any) {
    const userId = req.user.id; 
    const { page, limit } = paginateComplaintsDto;
    return await this.complaintsService.getMyComplaints(userId, page, limit);
  }

  @Get(':id')
  async getComplaintDetails(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return await this.complaintsService.getComplaintDetails(id, userId);
  }

  @Delete(':id')
  async deleteComplaint(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const userId = req.user.id; 
    await this.complaintsService.deleteComplaint(id, userId);
    return { message: 'Complaint deleted successfully.' };
  }
}
