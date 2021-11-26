import { AggregateRoot } from '@nestjs/cqrs';
import { ApplicantId } from '../value-objects/applicant-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { ApplicantRegisteredEvent } from '../events/applicant-registered.event';
import { User } from '../../../common/domain/factories/user/entities/abstract/user';

export class Applicant extends AggregateRoot implements User {
  private id: ApplicantId;
  private name: Name;
  private email: Email;
  private password: Password;
  private mySpecialty: string;
  private myExperience: string;
  private description: string;
  private nameGithub: string;
  private imgApplicant: string;

  public constructor(
    id: ApplicantId,
    name: Name,
    email: Email,
    password: Password,
    mySpecialty: string,
    myExperience: string,
    description: string,
    nameGithub: string,
    imgApplicant: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.mySpecialty = mySpecialty;
    this.myExperience = myExperience;
    this.description = description;
    this.nameGithub = nameGithub;
    this.imgApplicant = imgApplicant;
  }

  public register() {
    const event = new ApplicantRegisteredEvent(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.email.getValue(),
      this.password.getValue(),
      this.mySpecialty,
      this.myExperience,
      this.description,
      this.nameGithub,
      this.imgApplicant,
    );
    this.apply(event);
  }

  public getId(): ApplicantId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getMySpecialty(): string {
    return this.mySpecialty;
  }

  public getMyExperience(): string {
    return this.myExperience;
  }

  public getDescription(): string {
    return this.description;
  }

  public getNameGithub(): string {
    return this.nameGithub;
  }

  public getImgApplicant(): string {
    return this.imgApplicant;
  }

  public changeId(id: ApplicantId) {
    this.id = id;
  }

  public changeName(name: Name) {
    this.name = name;
  }

  public changeEmail(email: Email) {
    this.email = email;
  }

  public changePassword(password: Password) {
    this.password = password;
  }

  public changeMySpecialty(mySpecialty: string) {
    this.mySpecialty = mySpecialty;
  }

  public changeMyExperience(myExperience: string) {
    this.myExperience = myExperience;
  }

  public changeDescription(description: string) {
    this.description = description;
  }

  public changeNameGithub(nameGithub: string) {
    this.nameGithub = nameGithub;
  }

  public changeImgApplicant(imgApplicant: string) {
    this.imgApplicant = imgApplicant;
  }
}
