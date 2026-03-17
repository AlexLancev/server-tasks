import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PasswordResetService } from './password-reset.service';
import { EmailModule } from 'src/email';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [ProfileService, UsersService, PasswordResetService],
  exports: [ProfileService],
  imports: [EmailModule],
})
export class UsersModule {}
