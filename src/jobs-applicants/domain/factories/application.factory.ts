import { ApplicationsEntity } from '../entities/applications.entity';
import { Id } from '../../../common/domain/value-objects/id.value';
import { DateCustom } from '../value-objects/date-custom';
import { StateType } from '../enums/state-type.enum';

export class ApplicationFactory {

  public static createFrom(id: number = 0, applicantId: number, announcementId: number, state: StateType, date: DateCustom) {
    return new ApplicationsEntity(Id.create(id), applicantId, announcementId, state, date);
  }
}
