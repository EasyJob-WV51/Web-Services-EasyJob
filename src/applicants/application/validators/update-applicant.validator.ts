import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { UpdateApplicantRequestDto } from '../dtos/request/update-applicant-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Result } from 'typescript-result';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class UpdateApplicantValidator {
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateApplicantRequestDto: UpdateApplicantRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateApplicantRequestDto.id;

    if (id == null) {
      notification.addError('Applicant id is required', null);
    }

    const firstName: string = updateApplicantRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Applicant firstname is required', null);
    }

    const lastName: string = updateApplicantRequestDto.lastName.trim();

    if (lastName.length <= 0) {
      notification.addError('Applicant lastName is required', null);
    }

    const email: string = updateApplicantRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Applicant email is required', null);
    }

    const password: string = updateApplicantRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Applicant password is required', null);
    }

    const mySpecialty: string = updateApplicantRequestDto.mySpecialty.trim();

    if (mySpecialty.length <= 0) {
      notification.addError('Applicant mySpecialty is required', null);
    }

    const myExperience: string = updateApplicantRequestDto.myExperience.trim();

    if (myExperience.length <= 0) {
      notification.addError('Applicant myExperience is required', null);
    }

    const description: string = updateApplicantRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Applicant description is required', null);
    }

    const nameGithub: string = updateApplicantRequestDto.nameGithub.trim();

    if (nameGithub.length <= 0) {
      notification.addError('Applicant nameGithub is required', null);
    }

    const imgApplicant: string = updateApplicantRequestDto.imgApplicant.trim();

    if (imgApplicant.length <= 0) {
      notification.addError('Applicant imgApplicant is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const nameResult: Result<AppNotification, Name> = Name.create(
      firstName,
      lastName,
    );

    if (nameResult.isFailure()) {
      notification.addErrors(nameResult.error.getErrors());
    }

    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const passwordResult: Result<AppNotification, Password> =
      Password.create(password);

    if (passwordResult.isFailure()) {
      notification.addErrors(passwordResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const applicant: ApplicantTypeORM = await this.applicantRepository.findOne(
      targetId,
    );

    let otherApplicant: ApplicantTypeORM =
      await this.applicantRepository.findOne(id);

    if (
      otherApplicant != null &&
      otherApplicant.id.value !== applicant.id.value
    ) {
      notification.addError(
        `There is already an applicant with id: ${id}`,
        null,
      );
    }

    otherApplicant = await this.applicantRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (
      applicant != null &&
      otherApplicant.email.value !== applicant.email.value
    ) {
      notification.addError('Applicant email is taken', null);
    }

    return notification;
  }
}
