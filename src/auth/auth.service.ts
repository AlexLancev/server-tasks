import { ProfileService } from 'src/users';
import { AccessDto, LoginDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly profileService: ProfileService) {}

  login(data: LoginDto): AccessDto {
    const id = uuidv4();
    const profile = this.profileService.findById(id);

    return { ...profile, token: 'Hello' };
  }
}
