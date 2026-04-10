import { UserRole, UserStatus } from 'src/users/dto';

export class LoginDataDto {
  id: string;
  hash: string;
  role: UserRole;
  status: UserStatus;
}
