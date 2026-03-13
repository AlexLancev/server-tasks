import { User } from 'generated/prisma/client';
import { ViewUserDto } from '../dto';
import { mapUserRoleFromDB } from './user-role.mapper';
import { mapUserStatusFromDB } from './user-status.mapper';

export class UserViewMapper {
  mapOne(user: User): ViewUserDto {
    return {
      id: user.id,
      role: mapUserRoleFromDB(user.role),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: mapUserStatusFromDB(user.status),
      createdAt: user.createdAt,
      createdBy: user.createdBy,
    };
  }
  mapMany(data: User[]): ViewUserDto[] {
    return data.map((one: User) => this.mapOne(one));
  }
}
