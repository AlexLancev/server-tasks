import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SetPasswordDto {
  @Length(1, 100)
  code: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
