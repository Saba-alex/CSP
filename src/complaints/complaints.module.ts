import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintsSchema } from './complaints.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Complaint.name , schema: ComplaintsSchema}])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
