import { BaseException } from './base';

export class InvalidPayloadException extends BaseException {
  issues: any[] = [];
  constructor(issues: any[]) {
    super('Invalid payload.', 400, 'INVALID_PAYLOAD');
    this.issues = issues;
  }
}
