import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsModule } from './complaints/complaints.module';
import { OtpModule } from './otp/otp.module';
import { ComplaintsCategoryModule } from './complaints-category/complaints-category.module';
import { AuthModule } from './auth/auth.module';
import { CmsModule } from './cms/cms.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>(
          'database.connectionString',
        );
        console.log('MongoDB Connection String:', connectionString);
        return {
          uri: connectionString,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    ComplaintsModule,
    OtpModule,
    ComplaintsCategoryModule,
    AuthModule,
    CmsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
