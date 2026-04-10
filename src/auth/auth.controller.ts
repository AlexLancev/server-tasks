import { Body, Controller, Post } from '@nestjs/common';
import { AccessDto, LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto): Promise<AccessDto> {
    return this.authService.login(data);
  }
}
