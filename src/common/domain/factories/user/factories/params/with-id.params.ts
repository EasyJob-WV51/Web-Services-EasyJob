import { Name } from '../../../../value-objects/name.value';
import { Email } from '../../../../value-objects/email.value';
import { Password } from '../../../../value-objects/password.value';
import { NameCompany } from '../../../../../../companies/domain/value-objects/namecompany.value';
import { ApplicantId } from '../../../../../../applicants/domain/value-objects/applicant-id.value';
import { CompanyId } from '../../../../../../companies/domain/value-objects/company-id.value';

export interface WithIdParams {
  //Common
  email?: Email;
  password?: Password;

  //Applicant
  applicantId?: ApplicantId;
  name?: Name;
  mySpecialty?: string;
  myExperience?: string;
  description?: string;
  nameGithub?: string;
  imgApplicant?: string;

  //Company
  companyId?: CompanyId;
  nameCompany?: NameCompany;
  descriptionCompany?: string;
  imgCompany?: string;
}
