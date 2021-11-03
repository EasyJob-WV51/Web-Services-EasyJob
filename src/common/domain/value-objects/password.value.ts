import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Password {
  public readonly value: string;
  public static MIN_LENGTH = 8;
  public static MAX_LENGTH = 15;

  public constructor(value: string) {
    this.value = value;
  }

  public static create(password: string): Result<AppNotification, Password> {
    const notification: AppNotification = new AppNotification();

    password = (password ?? '').trim();

    if (password === '') {
      notification.addError('password is required', null);
    }

    if (password.length < this.MIN_LENGTH) {
      notification.addError(
        `The minimum length of a password id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (password.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of a password id ${this.MIN_LENGTH}`,
        null,
      );
    }

    const regExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
    );

    if (regExp.test(password) === false) {
      notification.addError('password format is invalid', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Password(password));
  }

  public getValue(): string {
    return this.value;
  }
}
