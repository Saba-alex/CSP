import { Module } from '@nestjs/common';
import { ComplaintsCategoryService } from './complaints-category.service';
import { ComplaintsCategoryController } from './complaints-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintCategory, ComplaintsCategorySchema } from './complaints-category.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: ComplaintCategory.name , schema: ComplaintsCategorySchema}])],
  controllers: [ComplaintsCategoryController],
  providers: [ComplaintsCategoryService],
})
export class ComplaintsCategoryModule {}
