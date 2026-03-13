import { UserRole as DB } from 'generated/prisma/enums';
import { UserRole as Client } from '../dto';

const toDbMap: Record<Client, DB> = {
  [Client.ADMIN]: DB.admin,
  [Client.USER]: DB.user,
};

const fromDbMap: Record<DB, Client> = {
  [DB.admin]: Client.ADMIN,
  [DB.user]: Client.USER,
};

export const mapUserRoleToDB = (role: Client): DB => toDbMap[role];
export const mapUserRoleFromDB = (role: DB): Client => fromDbMap[role];
