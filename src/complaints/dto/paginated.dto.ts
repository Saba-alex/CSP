import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class PaginateComplaintsDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsInt()
  readonly page: number;

  @IsInt()
  readonly limit: number;
}