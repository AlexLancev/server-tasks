import {
  ResetPasswordDto,
  SetPasswordDto,
  ViewProfileDto,
  UserRole,
} from './dto';

export class ProfileService {
  getProfile(userId: string): ViewProfileDto {
    return {
      id: userId,
      role: UserRole.USER,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
  }

  public resetPassword(data: ResetPasswordDto): ResetPasswordDto {
    return {
      email: data.email,
    };
  }

  public setPassword(data: SetPasswordDto): SetPasswordDto {
    return {
      token: data.token,
      password: data.password,
      email: data.email,
    };
  }

  public findById(id: string): ViewProfileDto {
    return {
      id,
      role: UserRole.USER,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
  }
}
