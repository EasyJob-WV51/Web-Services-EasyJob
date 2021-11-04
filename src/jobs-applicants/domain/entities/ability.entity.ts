import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';

export class Ability extends AggregateRoot {
  private id: Id;
  private jobId: Id;
  private specialty: string;
  private experience: number;


  public constructor(
    id: Id,
    jobId: Id,
    specialty: string,
    experience: number,
  ) {
    super();
    this.id = id;
    this.jobId = jobId;
    this.specialty = specialty;
    this.experience = experience;
  }

  public showSpecialty() {
    return this.specialty;
  }

  public showExperience() {
    return this.experience;
  }

  public changeSpecialty(specialty: string) {
    this.specialty = specialty;
  }

  public increaseExperience(increase: number) {
    this.experience += increase;
  }

  public diminishExperience(diminish: number) {
    this.experience -= diminish;
  }
}
