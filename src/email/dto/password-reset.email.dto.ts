export class PasswordResetEmailDto {
  code: string;
  email: string;
  expiresAt: Date;
  name: string;
}
