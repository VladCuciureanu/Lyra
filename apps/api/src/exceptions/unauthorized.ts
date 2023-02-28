import { BaseException } from './base';

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized.') {
    super(message, 401, 'UNAUTHORIZED');
  }
}
