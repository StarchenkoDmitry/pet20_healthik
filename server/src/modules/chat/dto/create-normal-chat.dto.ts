import { IsString, IsUUID } from 'class-validator';

export class CreateNormalChat {
  @IsString()
  @IsUUID()
  userId: string;
}
