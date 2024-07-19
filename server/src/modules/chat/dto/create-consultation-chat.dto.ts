import { IsString } from 'class-validator';

export class CreateConsultationChat {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
