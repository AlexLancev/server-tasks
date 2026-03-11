import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRole } from './user-role';

export class ViewProfileDto {
  @IsUUID('4')
  id: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
