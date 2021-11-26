import { Name } from '../../../../value-objects/name.value';
import { Email } from '../../../../value-objects/email.value';
import { Password } from '../../../../value-objects/password.value';
import { NameCompany } from '../../../../../../companies/domain/value-objects/namecompany.value';

export interface CreateFromParams {
  //Common
  email?: Email;
  password?: Password;

  //Applicant
  name?: Name;
  mySpecialty?: string;
  myExperience?: string;
  description?: string;
  nameGithub?: string;
  imgApplicant?: string;

  //Company
  nameCompany?: NameCompany;
  descriptionCompany?: string;
  imgCompany?: string;
}
