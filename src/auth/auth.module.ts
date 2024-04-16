import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, userSchema } from './auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),JwtModule.register({
    global: true,
    secret: 'secretsecret',
    signOptions: { expiresIn: '120s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService,MongooseModule]
})
export class AuthModule {}
