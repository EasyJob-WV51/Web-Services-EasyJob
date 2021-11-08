import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class NameCompany {
  private readonly nameCompany: string;
  private static MAX_LENGTH = 30;

  private constructor(nameCompany: string) {
    this.nameCompany = nameCompany;

  }

  public getNameCompany(): string {
    return this.nameCompany;
  }

  public static create(
    nameCompany: string,
  ): Result<AppNotification, NameCompany> {
    const notification: AppNotification = new AppNotification();

    nameCompany = (nameCompany ?? '').trim();

    if (nameCompany === '') {
      notification.addError('firsName is required', null);
    }

    if (nameCompany.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an firstName is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new NameCompany(nameCompany));
  }
}