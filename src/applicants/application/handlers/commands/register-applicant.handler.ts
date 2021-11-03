import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterApplicantCommand } from '../../commands/register-applicant.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { ApplicantFactory } from '../../../domain/factories/applicant.factory';
import { Applicant } from '../../../domain/entities/applicant.entity';
import { ApplicantMapper } from '../../mappers/applicant.mapper';
import { ApplicantId } from '../../../domain/value-objects/applicant-id.value';

@CommandHandler(RegisterApplicantCommand)
export class RegisterApplicantHandler
  implements ICommandHandler<RegisterApplicantCommand>
{
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterApplicantCommand) {
    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
    );

    if (nameResult.isFailure()) {
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );

    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return 0;
    }

    let applicant: Applicant = ApplicantFactory.createFrom(
      nameResult.value,
      emailResult.value,
      passwordResult.value,
      command.mySpecialty,
      command.myExperience,
      command.description,
      command.nameGithub,
      command.imgApplicant,
    );

    let applicantTypeORM = ApplicantMapper.toTypeORM(applicant);
    applicantTypeORM = await this.applicantRepository.save(applicantTypeORM);

    if (applicantTypeORM == null) {
      return 0;
    }

    const applicantId = Number(applicantTypeORM.id.value);
    applicant.changeId(ApplicantId.create(applicantId));

    applicant = this.publisher.mergeObjectContext(applicant);
    applicant.register();
    applicant.commit();

    return applicantId;
  }
}
