import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';
import { PasswordResetEmailDto } from './dto';
import { config } from 'src/common';

@Injectable()
export class HeloEmailService {
  constructor(private readonly email: EmailService) {}

  public async send(data: PasswordResetEmailDto): Promise<void> {
    const { subject } = config.email.hello;

    await this.email.send({
      to: data.email,
      subject,
      html: `
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email: ${config.frontend.confirmUrl}</p>
      `,
    });
  }
}
