import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CMSLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}