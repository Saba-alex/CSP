import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './otp.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import * as nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import * as crypto from 'crypto';
require('dotenv').config();

@Injectable()
export class OtpService {
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor(
    @InjectModel(Otp.name) private OtpModel: Model<Otp>,
    private authService: AuthService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user:  process.env.USER,
        pass:  process.env.PASS,
      },
    });
  }

  async generateOtp(email: string) {
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = this.generateOTP();
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
    const otpData = await this.OtpModel.create({
      otp,
      verificationToken,
      expirationTime,
      email,
    });

    await this.sendOtpByEmail(email, otp);

    return otpData;
  }

  private async sendOtpByEmail(email: string, otp: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async verifyOtp(email: string, otp: string, verificationToken: string) {
    const otpData = await this.OtpModel.findOne({
      otp,
      verificationToken,
      email,
    });

    if (!otpData) {
      return false;
    }

    if (otpData.expirationTime < new Date()) {
      return false;
    }

    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      return false;
    }

    if (user.email !== email) {
      return false;
    }
    return true;
  }

  async resendOtp(email: string) {
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = this.generateOTP();
    await this.sendOtpByEmail(email, otp);

    return 'OTP resent successfully';
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const reset = await this.authService.resetPassword(email, newPassword);
    return reset;
  }

  private generateOTP(): string {
    return otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }
}
