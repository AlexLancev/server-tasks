import { v4 as uuidv4 } from 'uuid';

export class ProfileService {
  getProfile() {
    return {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
