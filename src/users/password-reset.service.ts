import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma';

export class PasswordResetService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOrReplace(userId: string, email: string): Promise<void> {
    const data: Prisma.PasswordResetUncheckedCreateInput = {
      userId,
      attempts: 0,
      code: this.generateCode(),
    };
  }

  private generateCode(): string {}
}