import { AggregateRoot } from '@nestjs/cqrs';
import { AnnouncementId } from '../value-objects/announcement-id.value';
import { AnnouncementRegisteredEvent } from '../events/announcement-registered.event';
import { register } from 'tsconfig-paths';
import { CompanyId } from '../../../companies/domain/value-objects/company-id.value';

export class Announcement extends AggregateRoot {
  private id: AnnouncementId;
  private title: string;
  private description: string;
  private requiredSpecialty: string;
  private requiredExperience: string;
  private salary: number;
  private typeMoney: string;
  private visible: boolean;
  private companyId: number;

  public constructor(
    id: AnnouncementId,
    title: string,
    description: string,
    requiredSpecialty: string,
    requiredExperience: string,
    salary: number,
    typeMoney: string,
    visible: boolean,
    companyId: number,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.requiredSpecialty = requiredSpecialty;
    this.requiredExperience = requiredExperience;
    this.salary = salary;
    this.typeMoney = typeMoney;
    this.visible = visible;
    this.companyId = companyId;
  }
  public register() {
    const event = new AnnouncementRegisteredEvent(
      this.id.getValue(),
      this.title,
      this.description,
      this.requiredSpecialty,
      this.requiredExperience,
      this.salary,
      this.typeMoney,
      this.visible,
      this.companyId,
    );
    this.apply(event);
  }
  public getId(): AnnouncementId {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getSpecialty(): string {
    return this.requiredSpecialty;
  }
  public getExperience(): string {
    return this.requiredExperience;
  }
  public getSalary(): number {
    return this.salary;
  }
  public getTypeMoney(): string {
    return this.typeMoney;
  }
  public getVisible(): boolean {
    return this.visible;
  }
  public getCompanyId(): number {
    return this.companyId;
  }
  public changeId(id: AnnouncementId) {
    this.id = id;
  }
}
