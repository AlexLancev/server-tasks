import { UserRole } from './user-role';
import { IsEmail, IsEnum, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(3, 20)
  firstName: string;
  @Length(3, 20)
  lastName: string;
  @IsEnum(UserRole)
  role: UserRole;
}
