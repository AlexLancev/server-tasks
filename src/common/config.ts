import convict from 'convict';

const schema = convict({
  port: {
    doc: 'The application port',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  email: {
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
});

schema.validate({ allowed: 'strict' });

export const config = schema.getProperties();
