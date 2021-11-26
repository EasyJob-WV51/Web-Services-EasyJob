import { AppNotification } from '../../../common/application/app.notification';

export class KeywordSearchApplicantValidator {
  public async validate(keyword: string): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (keyword === null) {
      notification.addError('Keyword cannot be null', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    if (keyword.trim() === '') {
      notification.addError('Keyword must not be empty', null);
    }

    return notification;
  }
}
