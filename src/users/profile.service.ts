import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SetPasswordDto, ViewProfileDto, UserRole } from './dto';
import { PasswordResetService } from './password-reset.service';
import { PrismaService } from 'src/prisma';
import { UserStatus } from 'generated/prisma/enums';
import { HeloEmailService } from 'src/email';
import { mapUserRoleFromDB } from './mappers';

@Injectable()
export class ProfileService {
  constructor(
    private readonly heloEmailService: HeloEmailService,
    private readonly passwordResetService: PasswordResetService,
    private readonly prisma: PrismaService,
  ) {}
  public async getProfile(id: string): Promise<ViewProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        role: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      id,
      role: mapUserRoleFromDB(user.role),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public async resetPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) return;
    if (user.status !== UserStatus.active) {
      throw new ForbiddenException('Account is banned');
    }

    const reset = await this.passwordResetService.createOrReplace(user.id);
    await this.heloEmailService.send({
      ...reset,
      email: user.email,
      name: user.firstName,
    });
  }

  public async setPassword({
    code,
    email,
    password,
  }: SetPasswordDto): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });
    if (!user) return;
    if (user.status !== UserStatus.active) {
      throw new ForbiddenException('Account is banned');
    }

    await this.passwordResetService.setPassword(user.id, code, password);
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
