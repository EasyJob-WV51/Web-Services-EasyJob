import { Applicant } from '../../../../../../applicants/domain/entities/applicant.entity';
import { ApplicantId } from '../../../../../../applicants/domain/value-objects/applicant-id.value';
import { UserAbstractFactory } from '../abstract/user-abstract.factory';
import { CreateFromParams } from '../params/create-from.params';
import { WithIdParams } from '../params/with-id.params';

export class ApplicantFactory extends UserAbstractFactory {
  public createFrom(params: CreateFromParams): Applicant {
    return new Applicant(
      ApplicantId.create(0),
      params.name,
      params.email,
      params.password,
      params.mySpecialty,
      params.myExperience,
      params.description,
      params.nameGithub,
      params.imgApplicant,
    );
  }

  public withId(params: WithIdParams): Applicant {
    return new Applicant(
      params.applicantId,
      params.name,
      params.email,
      params.password,
      params.mySpecialty,
      params.myExperience,
      params.description,
      params.nameGithub,
      params.imgApplicant,
    );
  }
}
