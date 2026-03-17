import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';
import { HelloEmailDTO, PasswordResetEmailDTO } from './dto';
import { config } from 'src/common';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class HeloEmailService {
  constructor(
    private readonly email: EmailService,
    private readonly emailTemplateService: EmailTemplateService,
  ) {}

  public async send(data: PasswordResetEmailDTO): Promise<void> {
    const { subject } = config.email.hello;

    const input = new HelloEmailDTO(data);
    const html = await this.emailTemplateService.render(input);

    await this.email.send({
      to: data.email,
      subject,
      html,
    });
  }
}
