import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

export class Email {
  private value: string;
  private static MAX_LENGTH = 150;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(email: string): Result<AppNotification, Email> {
    const notification: AppNotification = new AppNotification();

    email = (email ?? '').trim();

    if (email === '') {
      notification.addError('Email is required', null);
    }

    if (email.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an email is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    const regExp = new RegExp(
      '^(([^<>()[\\].,;:\\s@"]+(\\.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    );

    if (regExp.test(email) === false) {
      notification.addError('Email format is invalid', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Email(email));
  }

  public getValue(): string {
    return this.value;
  }
}
