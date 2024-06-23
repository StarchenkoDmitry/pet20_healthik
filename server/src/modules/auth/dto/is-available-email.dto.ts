import { IsEmail, Length } from "class-validator";
import { MAX_EMAIL_LENGTH, MIN_EMAIL_LENGTH } from "src/common/constants/auth";

export class AvailableEmailDto {
  @IsEmail()
  @Length(MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH)
  email!: string;
}
