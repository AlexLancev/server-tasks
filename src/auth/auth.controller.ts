import { Body, Controller } from '@nestjs/common';
import { AccessDto, LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login(@Body() data: LoginDto): AccessDto {
    return this.authService.login(data);
  }
}
