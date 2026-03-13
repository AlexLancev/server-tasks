import { UserStatus as DB } from 'generated/prisma/enums';
import { UserStatus as Client } from '../dto';

const toDbMap: Record<Client, DB> = {
  [Client.ACTIVE]: DB.active,
  [Client.BANNED]: DB.banned,
};

const fromDbMap: Record<DB, Client> = {
  [DB.active]: Client.ACTIVE,
  [DB.banned]: Client.BANNED,
};

export const mapUserStatusToDB = (status: Client): DB => toDbMap[status];
export const mapUserStatusFromDB = (status: DB): Client => fromDbMap[status];
