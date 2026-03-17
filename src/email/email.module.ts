import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HeloEmailService } from './helo-email.service';
import { EmailTemplateService } from './email-template.service';

@Module({
  providers: [EmailService, EmailTemplateService, HeloEmailService],
  exports: [HeloEmailService],
})
export class EmailModule {}
