import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class NameCompany {
  private readonly firstName: string;
  private static MAX_LENGTH = 30;

  private constructor(firstName: string) {
    this.firstName = firstName;

  }

  public getFirstName(): string {
    return this.firstName;
  }

  public static create(
    firstName: string,
  ): Result<AppNotification, NameCompany> {
    const notification: AppNotification = new AppNotification();

    firstName = (firstName ?? '').trim();

    if (firstName === '') {
      notification.addError('firsName is required', null);
    }

    if (firstName.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an firstName is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new NameCompany(firstName));
  }
}