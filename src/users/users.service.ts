import {
  BanUserDto,
  CreateUserDto,
  UserRole,
  UserStatus,
  ViewUserDto,
} from './dto';
import { v4 as uuidv4 } from 'uuid';

export class UsersService {
  create(data: CreateUserDto): ViewUserDto {
    return {
      ...data,
      id: uuidv4(),
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      createdBy: uuidv4(),
    };
  }

  get(): ViewUserDto[] {
    return [];
  }

  getById(id: string): ViewUserDto {
    return {
      id,
      role: UserRole.USER,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      createdBy: uuidv4(),
    };
  }

  update(id: string, data: CreateUserDto): ViewUserDto {
    return {
      ...data,
      id,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      createdBy: uuidv4(),
    };
  }

  ban(id: string, data: BanUserDto): ViewUserDto {
    return {
      ...data,
      id,
      role: UserRole.USER,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: data.banned ? UserStatus.BANNED : UserStatus.ACTIVE,
      createdAt: new Date(),
      createdBy: uuidv4(),
    };
  }
}
