import { Controller } from '@nestjs/common';
import { ComplaintsCategoryService } from './complaints-category.service';

@Controller('complaints-category')
export class ComplaintsCategoryController {
  constructor(private readonly complaintsCategoryService: ComplaintsCategoryService) {}
}
