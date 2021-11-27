import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { ApplicationsEntity } from '../entities/applications.entity';
import { Res } from '@nestjs/common';

export class DateCustom {
  private date: string;
  private static MAX_LENGTH: number = 10;

  private constructor(
    date: string
  ) {
    this.date = date;
  }

  public static create(date: string): Result<AppNotification, DateCustom> {
    let notification: AppNotification = new AppNotification();

    date = (date ?? "").trim();
    if (date == '') {
      notification.addError('Date is required', null);
    }
    if (date.length > this.MAX_LENGTH) {
      notification.addError('Date field must have ' + this.MAX_LENGTH + ' characters', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DateCustom(date));
  }

  public static from(date: string) {
    return new DateCustom(
      date
    );
  }
  public static of(
    day: number,
    month: number,
    year: number
  ) {
    return new DateCustom(`${year}-${month}-${day}`);
  }
  public getDate() {
    return this.date;
  }
}
