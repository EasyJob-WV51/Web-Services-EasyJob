import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Applicant } from '../entities/applicant.entity';
import { ApplicantId } from '../value-objects/applicant-id.value';

export class ApplicantFactory {
  public static createFrom(
    name: Name,
    email: Email,
    password: Password,
    mySpecialty: string,
    myExperience: string,
    description: string,
    nameGithub: string,
    imgApplicant: string,
  ): Applicant {
    return new Applicant(
      ApplicantId.create(0),
      name,
      email,
      password,
      mySpecialty,
      myExperience,
      description,
      nameGithub,
      imgApplicant,
    );
  }

  public withId(
    applicantId: ApplicantId,
    name: Name,
    email: Email,
    password: Password,
    mySpecialty: string,
    myExperience: string,
    description: string,
    nameGithub: string,
    imgApplicant: string,
  ): Applicant {
    return new Applicant(
      applicantId,
      name,
      email,
      password,
      mySpecialty,
      myExperience,
      description,
      nameGithub,
      imgApplicant,
    );
  }
}
