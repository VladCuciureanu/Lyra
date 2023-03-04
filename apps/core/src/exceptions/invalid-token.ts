import { BaseException } from './base';

export class InvalidTokenException extends BaseException {
  constructor(message = 'Invalid token.') {
    super(message, 403, 'INVALID_TOKEN');
  }
}
