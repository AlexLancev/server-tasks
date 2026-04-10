import { randomUUID } from 'crypto';
import { PrismaClient, UserRole, UserStatus } from 'generated/prisma/client';
import { config, Hasher } from 'src/common';

export const seedUser = async (prisma: PrismaClient): Promise<void> => {
  const { email, password, firstName, lastName } = config.seedUser;

  if (!(email && password && firstName && lastName)) {
    console.log('Seed user configuration is missing');
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: { equals: email, mode: 'insensitive' },
    },
  });

  if (user) {
    console.log('User already exists');
    return;
  }

  const id = randomUUID();
  const hash = await Hasher.hash(password);

  await prisma.user.create({
    data: {
      id,
      email,
      role: UserRole.admin,
      firstName,
      lastName,
      status: UserStatus.active,
      createdBy: id,
      hash,
    },
  });

  console.log('User created successfully');
};
