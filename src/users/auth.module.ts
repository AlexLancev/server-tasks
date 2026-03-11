import { Module } from '@nestjs/common';
import { AuthController, AuthService } from 'src/auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
