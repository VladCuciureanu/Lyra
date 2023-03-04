import { BaseException } from './base';

export class NotFoundException extends BaseException {
  constructor() {
    super(`Requested resource not found.`, 404, 'NOT_FOUND');
  }
}
