import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ResetPasswordDto, SetPasswordDto, ViewProfileDto } from './dto';
import { randomUUID } from 'crypto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): Promise<ViewProfileDto> {
    return this.profileService.getProfile(randomUUID());
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() data: ResetPasswordDto): Promise<void> {
    return this.profileService.resetPassword(data.email);
  }

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  setPassword(@Body() data: SetPasswordDto): Promise<void> {
    return this.profileService.setPassword(data);
  }
}
