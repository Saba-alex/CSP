import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/siginup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from 'src/guards/authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(
      signUpDto.email,
      signUpDto.firstName,
      signUpDto.lastName,
      signUpDto.password,
    );
    return { message: 'User registered successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const accessToken = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return { accessToken };
  }
}
