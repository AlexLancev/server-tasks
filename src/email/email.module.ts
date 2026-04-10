import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HeloEmailService } from './helo-email.service';
import { EmailTemplateService } from './email-template.service';
import { FakeEmailService } from './fake-email.service';
import { config } from 'src/common';
import { RealEmailService } from './real-email.service';

@Module({
  providers: [
    {
      provide: EmailService,
      useClass: config.email.disabled ? FakeEmailService : RealEmailService,
    },
    EmailTemplateService,
    HeloEmailService,
  ],
  exports: [HeloEmailService],
})
export class EmailModule {}
