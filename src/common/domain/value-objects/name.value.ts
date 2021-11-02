import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Name {
  private readonly firstName: string;
  private readonly lastName: string;
  private static MAX_LENGTH = 30;

  private constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public static create(
    firstName: string,
    lastName: string,
  ): Result<AppNotification, Name> {
    const notification: AppNotification = new AppNotification();

    firstName = (firstName ?? '').trim();
    lastName = (lastName ?? '').trim();

    if (firstName === '') {
      notification.addError('firsName is required', null);
    }

    if (lastName === '') {
      notification.addError('lastName is required', null);
    }

    if (firstName.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an firstName is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    if (lastName.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an lastName is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Name(firstName, lastName));
  }
}
