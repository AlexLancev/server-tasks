import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserJWT } from '../models';
import { config } from 'src/common';

export class AccessGuard implements CanActivate {
  private readonly jwt = new UserJWT(
    config.jwt.secret,
    config.jwt.expirationSeconds,
  );

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
  }

  private extractToken(request: Request): string | null {
    const authorization = request.headers.authorization ?? null;
    if (!authorization || typeof authorization !== 'string') return null;

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') return null;
    return token;
  }
}
