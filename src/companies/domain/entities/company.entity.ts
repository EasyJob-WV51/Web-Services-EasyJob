import { AggregateRoot } from '@nestjs/cqrs';
import { CompanyId } from '../value-objects/company-id.value';
import { NameCompany } from '../value-objects/namecompany.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { CompanyRegisteredEvent } from '../events/company-registered.event';

export class Company extends AggregateRoot {
  private id: CompanyId;
  private nameCompany: NameCompany;
  private email: Email;
  private password: Password;
  private descriptionCompany: string;
  private imgCompany: string;

  public constructor(
    id: CompanyId,
    nameCompany: NameCompany,
    email: Email,
    password: Password,
    descriptionCompany: string,
    imgCompany: string,
  ) {
    super();
    this.id = id;
    this.nameCompany = nameCompany;
    this.email = email;
    this.password = password;
    this.descriptionCompany = descriptionCompany;
    this.imgCompany = imgCompany;
  }
  public register() {
    const event = new CompanyRegisteredEvent(
      this.id.getValue(),
      this.nameCompany.getFirstName(),
      this.email.getValue(),
      this.password.getValue(),
      this.descriptionCompany,
      this.imgCompany,
    );
    this.apply(event);
  }
  public getId(): CompanyId {
    return this.id;
  }
  public getNameCompany(): NameCompany {
    return this.nameCompany;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }
  public getDescriptionCompany(): string {
    return this.descriptionCompany;
  }
  public getImgCompany(): string {
    return this.imgCompany;
  }
  public changeId(id: CompanyId) {
    this.id = id;
  }
  public changeNameCompany(nameCompany: NameCompany) {
    this.nameCompany = nameCompany;
  }
  public changeEmail(email: Email) {
    this.email = email;
  }

  public changePassword(password: Password) {
    this.password = password;
  }
  public changeDescriptionCompany(descriptionCompany: string) {
    this.descriptionCompany = descriptionCompany;
  }
  public changeImgCompany(imgCompany: string) {
    this.imgCompany = imgCompany;
  }
}
