import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BanUserDto, CreateUserDto, UserStatus, ViewUserDto } from './dto';
import { PrismaService } from 'src/prisma';
import { randomUUID } from 'crypto';
import { mapUserRoleToDB, UserViewMapper } from './mappers';
import { PasswordResetService } from './password-reset.service';

@Injectable()
export class UsersService {
  private readonly mapper = new UserViewMapper();
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateUserDto): Promise<ViewUserDto> {
    await this.checkEmail(data.email);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        id: randomUUID(),
        role: mapUserRoleToDB(data.role),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: UserStatus.ACTIVE,
        createdBy: randomUUID(),
      },
    });

    await this.passwordResetService.createOrReplace(user.id, user.email);

    return this.mapper.mapOne(user);
  }

  async get(): Promise<ViewUserDto[]> {
    const users = await this.prisma.user.findMany();
    return this.mapper.mapMany(users);
  }

  async getById(id: string): Promise<ViewUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return this.mapper.mapOne(user);
  }

  async update(id: string, data: CreateUserDto): Promise<ViewUserDto> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.email !== data.email) {
      await this.checkEmail(data.email);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: mapUserRoleToDB(data.role),
      },
    });

    return this.mapper.mapOne(updatedUser);
  }

  async ban(id: string, data: BanUserDto): Promise<ViewUserDto> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        status: data.banned ? UserStatus.BANNED : UserStatus.ACTIVE,
      },
    });

    return this.mapper.mapOne(updatedUser);
  }

  private async checkEmail(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { id: true },
    });
    if (user) {
      throw new BadRequestException('Email уже занят');
    }
  }
}
