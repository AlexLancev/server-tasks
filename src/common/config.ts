import convict from 'convict';
import { randomBytes } from 'crypto';

const schema = convict({
  port: {
    doc: 'The application port',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  email: {
    disabled: {
      doc: 'Disable email service',
      format: Boolean,
      default: false,
      env: 'EMAIL_DISABLED',
    },
    service: {
      doc: 'Email service',
      format: String,
      default: 'gmail',
      env: 'EMAIL_SERVICE',
    },
    auth: {
      user: {
        doc: 'Email user',
        format: String,
        default: '',
        env: 'EMAIL_USER',
      },
      pass: {
        doc: 'Email password',
        format: String,
        default: '',
        env: 'EMAIL_PASSWORD',
      },
    },
    hello: {
      subject: {
        doc: 'Confirm your email',
        format: String,
        default: 'Confirm your email',
        env: 'EMAIL_HELO_SUBJECT',
      },
    },
  },
  frontend: {
    baseUrl: {
      doc: 'Frontend URL',
      format: String,
      default: 'http://localhost:5000',
      env: 'FRONTEND_URL',
    },
    confirmUrl: {
      doc: 'Confirm account URL',
      format: String,
      default: 'http://localhost:5000/confirm',
      env: 'FRONTEND_CONFIRM_URL',
    },
  },
  jwt: {
    secret: {
      doc: 'JWT secret',
      format: String,
      default: randomBytes(32).toString('base64url'),
      env: 'JWT_SECRET',
    },
    expirationSeconds: {
      doc: 'JWT expiration seconds',
      format: Number,
      default: 3_600,
      env: 'JWT_EXPIRATION_SECONDS',
    },
  },
  password: {
    code: {
      min: {
        doc: 'Password reset code minimum value',
        format: Number,
        default: 9_999,
        env: 'PASSWORD_RESET_CODE_MIN',
      },
      max: {
        doc: 'Password reset code maximum value',
        format: Number,
        default: 999_999,
        env: 'PASSWORD_RESET_CODE_MAX',
      },
      expirationDays: {
        doc: 'Password expiration days',
        format: Number,
        default: 7,
        env: 'PASSWORD_RESET_EXPIRATION_DAYS',
      },
      attempts: {
        doc: 'Password reset attempts',
        format: Number,
        default: 3,
        env: 'PASSWORD_RESET_ATTEMPTS',
      },
    },
  },
  seedUser: {
    email: {
      doc: 'Initial user email',
      format: String,
      default: '',
      env: 'USER_EMAIL',
    },
    password: {
      doc: 'Initial user password',
      format: String,
      default: '',
      env: 'USER_PASSWORD',
    },
    firstName: {
      doc: 'Initial user first name',
      format: String,
      default: '',
      env: 'USER_FIRST_NAME',
    },
    lastName: {
      doc: 'Initial user last name',
      format: String,
      default: '',
      env: 'USER_LAST_NAME',
    },
  },
});

schema.validate({ allowed: 'strict' });

export const config = schema.getProperties();
