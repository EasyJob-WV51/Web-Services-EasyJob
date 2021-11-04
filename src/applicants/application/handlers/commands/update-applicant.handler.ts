import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicantRequestDto } from '../../dtos/request/update-applicant-request.dto';
import { UpdateApplicantCommand } from '../../commands/update-applicant.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../../../domain/entities/applicant.entity';
import { ApplicantFactory } from '../../../domain/factories/applicant.factory';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ApplicantId } from '../../../domain/value-objects/applicant-id.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { ApplicantMapper } from '../../mappers/applicant.mapper';

@CommandHandler(UpdateApplicantCommand)
export class UpdateApplicantHandler
  implements ICommandHandler<UpdateApplicantCommand>
{
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  async execute(command: UpdateApplicantCommand) {
    const idResult: ApplicantId = ApplicantId.create(command.id);

    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
    );

    if (nameResult.isFailure()) {
      return null;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );

    if (emailResult.isFailure()) {
      return null;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return null;
    }

    const applicant: Applicant = ApplicantFactory.withId(
      idResult,
      nameResult.value,
      emailResult.value,
      passwordResult.value,
      command.mySpecialty,
      command.myExperience,
      command.description,
      command.nameGithub,
      command.imgApplicant,
    );

    const applicantTypeORM = ApplicantMapper.toTypeORM(applicant);
    await this.applicantRepository.update(command.targetId, applicantTypeORM);

    return applicantTypeORM;
  }
}
