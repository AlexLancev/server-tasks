import { config, Hasher } from 'src/common';
import { AccessDto, LoginDataDto, LoginDto } from './dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserStatus } from 'src/users/dto';
import { mapUserRoleFromDB, mapUserStatusFromDB } from 'src/users/mappers';
import { UserJWT } from './models';
import { ProfileService } from 'src/users/profile.service';

const ERROR_MESSAGE = 'Wrong email or password';

@Injectable()
export class AuthService {
  private readonly jwt = new UserJWT(
    config.jwt.secret,
    config.jwt.expirationSeconds,
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly profile: ProfileService,
  ) {}

  public async login(data: LoginDto): Promise<AccessDto> {
    const user = await this.retrieveForLogin(data.email);
    this.checkLoginPermissions(user);

    const match = await Hasher.verify(data.password, user.hash);
    if (!match) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    const token = await this.jwt.sign(user.id, user.role);
    const profile = await this.profile.getProfile(user.id);

    return {
      ...profile,
      token,
    };
  }

  private async retrieveForLogin(email: string): Promise<LoginDataDto> {
    const data = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: {
        id: true,
        hash: true,
        role: true,
        status: true,
      },
    });

    if (!data || !data.hash) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    return {
      id: data.id,
      hash: data.hash,
      role: mapUserRoleFromDB(data.role),
      status: mapUserStatusFromDB(data.status),
    };
  }

  private checkLoginPermissions(user: LoginDataDto): void {
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }
  }
}
