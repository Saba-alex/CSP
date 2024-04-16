import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[AuthService],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
