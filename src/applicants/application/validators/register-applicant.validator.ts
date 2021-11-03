import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { RegisterApplicantRequestDto } from '../dtos/request/register-applicant-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

export class RegisterApplicantValidator {
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  public async validate(
    registerApplicantRequestDto: RegisterApplicantRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const firstName: string = registerApplicantRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Applicant firstname is required', null);
    }

    const lastName: string = registerApplicantRequestDto.lastName.trim();

    if (lastName.length <= 0) {
      notification.addError('Applicant lastName is required', null);
    }

    const email: string = registerApplicantRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Applicant email is required', null);
    }

    const password: string = registerApplicantRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Applicant password is required', null);
    }

    const mySpecialty: string = registerApplicantRequestDto.mySpecialty.trim();

    if (mySpecialty.length <= 0) {
      notification.addError('Applicant mySpecialty is required', null);
    }

    const myExperience: string =
      registerApplicantRequestDto.myExperience.trim();

    if (myExperience.length <= 0) {
      notification.addError('Applicant myExperience is required', null);
    }

    const description: string = registerApplicantRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Applicant description is required', null);
    }

    const nameGithub: string = registerApplicantRequestDto.nameGithub.trim();

    if (nameGithub.length <= 0) {
      notification.addError('Applicant nameGithub is required', null);
    }

    const imgApplicant: string =
      registerApplicantRequestDto.imgApplicant.trim();

    if (imgApplicant.length <= 0) {
      notification.addError('Applicant imgApplicant is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const applicant: ApplicantTypeORM = await this.applicantRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (applicant != null) {
      notification.addError('Applicant email is taken', null);
    }

    return notification;
  }
}
