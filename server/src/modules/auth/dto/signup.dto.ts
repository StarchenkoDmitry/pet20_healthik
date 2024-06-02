import { IsEmail, Length } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_EMAIL_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "src/common/constants/auth";

export class SignUpDto {
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name!: string;

  @IsEmail()
  @Length(MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH)
  email!: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password!: string;
}
