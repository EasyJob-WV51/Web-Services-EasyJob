import { NameCompany } from '../value-objects/namecompany.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Company } from '../entities/company.entity';
import { CompanyId } from '../value-objects/company-id.value';

export class CompanyFactory {
  public static createFrom(
    nameCompany: NameCompany,
    email: Email,
    password: Password,
    descriptionCompany: string,
    imgCompany: string,
  ): Company {
    return new Company(
      CompanyId.create(0),
      nameCompany,
      email,
      password,
      descriptionCompany,
      imgCompany,
    );
  }

  public static withId(
    companyId: CompanyId,
    nameCompany: NameCompany,
    email: Email,
    password: Password,
    descriptionCompany: string,
    imgCompany: string,
  ): Company {
    return new Company(
      companyId,
      nameCompany,
      email,
      password,
      descriptionCompany,
      imgCompany,
    );
  }
}