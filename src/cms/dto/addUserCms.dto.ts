import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddCmsUserDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    isEmployee: boolean;
  }