import { ProfileService } from 'src/users';
import { AccessDto, LoginDto } from './dto';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly profileService: ProfileService) {}

  login(data: LoginDto): AccessDto {
    const id = randomUUID();
    const profile = this.profileService.findById(id);

    return { ...profile, token: 'Hello' };
  }
}
