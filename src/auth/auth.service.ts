import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }
    const payload = { email: user.email, userId: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken)
    return accessToken ;
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
  }


  //cms function:

  async createCMSUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdmin: boolean,
    isEmployee: boolean,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isAdmin,
      isEmployee,
    });
    return await newUser.save();
  }

  async signInCMS(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
        throw new NotFoundException('User not found');
    }

    if (!(user.isAdmin || user.isEmployee)) {
        throw new UnauthorizedException('Not authorized to access CMS');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new NotFoundException('Invalid password');
    }

    const payload = { email: user.email, userId: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
}

async activateUser(userId: string): Promise<void> {
  await this.userModel.findByIdAndUpdate(userId, { isActive: true });
}

async deactivateUser(userId: string): Promise<void> {
  await this.userModel.findByIdAndUpdate(userId, { isActive: false });
}

async getCMSUsersPaginated(page: number, limit: number){
  const skip = (page - 1) * limit;
  return this.userModel.find().skip(skip).limit(limit).exec();
}

async getUserDetails(userId: string) {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
}

async makeUserAdmin(userId: string): Promise<void> {
  await this.userModel.findByIdAndUpdate(userId, { isAdmin: true });
}
}
