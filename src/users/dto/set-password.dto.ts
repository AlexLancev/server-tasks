import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SetPasswordDto {
  @Length(1, 100)
  token: string;

  @IsEmail()
  password: string;

  @IsStrongPassword()
  email: string;
}
