import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { JobDate } from '../value-objects/job-date.value';
import { JobApplied } from '../events/job-applied';

export class Job extends AggregateRoot {
  private id: Id;
  private companyId: Id;
  private title: string;
  private description: string;
  private specialty: string;
  private experience: string;
  private salary: Money;
  private visible: boolean;
  private onlyPractitioner: boolean;
  private date: JobDate;

  public constructor(
    id: Id,
    companyId: Id,
    title: string,
    description: string,
    specialty: string,
    experience: string,
    salary: Money,
    visible: boolean,
    onlyPractitioner: boolean,
    date: JobDate,
  ) {
    super();
    this.id = id;
    this.companyId = companyId;
    this.title = title;
    this.description = description;
    this.specialty = specialty;
    this.experience = experience;
    this.salary = salary;
    this.visible = visible;
    this.onlyPractitioner = onlyPractitioner;
    this.date = date;
  }

  public applyAJob() {
    const event = new JobApplied(
      this.id.getValue(),
      this.companyId.getValue(),
      this.showTitle(),
      this.description,
      this.showSalary().getAmount(),
      this.showSalary().getCurrency(),
      this.isVisible(),
      this.showDate().dateToString()
    );
    this.apply(event);
  }

  public showTitle() {
    return this.title;
  }

  public showDescription() {
    return this.description;
  }

  public showSpecialityRequired(){
    return this.specialty;
  }

  public showSpecialtyExperience() {
    return this.experience;
  }

  public showSalary() {
    return this.salary;
  }

  public isVisible() {
    return this.visible;
  }

  public isOnlyPractitioner() {
    return this.onlyPractitioner;
  }

  public showDate() {
    return this.date;
  }

  public changeTitle(title: string) {
    this.title = title;
  }

  public changeDescription(description: string) {
    this.description = description;
  }

  public changeSpecialty(specialty: string) {
    this.specialty = specialty;
  }

  public changeExperienceRequired(experience: string) {
    this.experience = experience;
  }

  public increaseSalary(increase: number) {
    this.salary = this.salary.add(Money.create(increase, this.salary.getCurrency()));
  }

  public diminishSalary(diminish: number) {
    this.salary = this.salary.subtract(Money.create(diminish, this.salary.getCurrency()));
  }

  public alterVisibility(currency: string) {
    this.visible = !this.visible;
  }

  public alterScope() {
    this.onlyPractitioner = !this.onlyPractitioner;
  }

  public changeDateOfAttributes(day: number, month: number, year: number) {
    this.date = JobDate.of(day, month, year);
  }

  public changeDate(date: JobDate) {
    this.date = date;
  }
}
