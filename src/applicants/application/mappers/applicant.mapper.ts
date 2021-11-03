import { Applicant } from '../../domain/entities/applicant.entity';
import { ApplicantTypeORM } from '../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { ApplicantIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/applicant.id.typeorm';

export class ApplicantMapper {
  public static toTypeORM(applicant: Applicant): ApplicantTypeORM {
    const applicantTypeORM: ApplicantTypeORM = new ApplicantTypeORM();

    applicantTypeORM.id = ApplicantIdTypeORM.from(applicant.getId().getValue());
    applicantTypeORM.name = NameTypeORM.from(
      applicant.getName().getFirstName(),
      applicant.getName().getLastName(),
    );
    applicantTypeORM.email = EmailTypeORM.from(applicant.getEmail().getValue());
    applicantTypeORM.password = EmailTypeORM.from(
      applicant.getPassword().getValue(),
    );
    applicantTypeORM.mySpecialty = applicant.getMySpecialty();
    applicantTypeORM.myExperience = applicant.getMyExperience();
    applicantTypeORM.description = applicant.getDescription();
    applicantTypeORM.nameGithub = applicant.getNameGithub();
    applicantTypeORM.imgApplicant = applicant.getImgApplicant();

    return applicantTypeORM;
  }
}
