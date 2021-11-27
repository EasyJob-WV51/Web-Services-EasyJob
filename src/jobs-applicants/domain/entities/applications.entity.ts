import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { DateCustom } from '../value-objects/date-custom';
import { StateType } from '../enums/state-type.enum';
import { ApplicationAcceptedEvent } from "../events/application-accepted.event";
import { ApplicationDeniedEvent } from "../events/application-denied.event";
import { ApplicationCreatedEvent } from "../events/application-created.event";

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

  public accepted() {
    const event = new ApplicationAcceptedEvent(
      this.showApplicationId(),
      this.showApplicantId(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public denied() {
    const event = new ApplicationDeniedEvent(
      this.showApplicationId(),
      this.showApplicantId(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public created() {
    const event = new ApplicationCreatedEvent(
      this.showApplicationId(),
      this.showApplicantId(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public showApplicationId() {
    return this.id.getValue();
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
