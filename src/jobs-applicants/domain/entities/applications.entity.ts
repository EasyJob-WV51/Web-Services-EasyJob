import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { DateCustom } from '../value-objects/date-custom';
import { StateType } from '../enums/state-type.enum';

export class ApplicationsEntity extends AggregateRoot {
  private id: Id;
  private readonly applicantId: number;
  private readonly announcementId: number;
  private date: DateCustom;
  private state: StateType

  constructor(
    id: Id,
    applicantId: number,
    announcementId: number,
    state: StateType,
    date: DateCustom
  ) {
    super();
    this.id = id;
    this.applicantId = applicantId;
    this.announcementId = announcementId;
    this.state = state;
    this.date = date;
  }

  public changeId(id: Id) {
    this.id = id;
  }
  public showApplicantId() {
    return this.applicantId;
  }
  public showAnnouncementId() {
    return this.announcementId;
  }
  public showDatePostulation() {
    return this.date.getDate();
  }
  public showState() {
    return this.state;
  }
  public changeState(state: StateType) {
    this.state = state;
  }
  public changeDatePostulation(date: string) {
    this.date = DateCustom.from(date);
  }
}
