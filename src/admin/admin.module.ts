import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ComplaintCategory,
  ComplaintsCategorySchema,
} from 'src/complaints-category/complaints-category.schema';
import { ComplaintsSchema } from 'src/complaints/complaints.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Complaint', schema: ComplaintsSchema },
      { name: ComplaintCategory.name, schema: ComplaintsCategorySchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
