import { IsString, IsNotEmpty } from 'class-validator';

export class SubmitComplaintDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsString()
  @IsNotEmpty()
  readonly complaintCategoryId: string;
}

