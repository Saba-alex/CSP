import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  async generateOtp(@Body('email') email: string) {
    await this.otpService.generateOtp(email);
    return { message: 'OTP generated successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string, @Body('verificationToken') verificationToken: string) {
    const isOtpValid = await this.otpService.verifyOtp(email, otp, verificationToken);
    if (isOtpValid) {
      return { message: 'OTP is valid' };
    } else {
      throw new NotFoundException('Invalid OTP');
    }
  }

  @Post('resend')
  async resendOtp(@Body('email') email: string) {
    await this.otpService.resendOtp(email);
    return { message: 'OTP resent successfully' };
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string, @Body('newPassword') newPassword: string) {
    await this.otpService.resetPassword(email, newPassword);
    return { message: 'Password reset successfully' };
  }
}
