import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicantCommand } from '../../commands/update-applicant.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../../../domain/entities/applicant.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ApplicantId } from '../../../domain/value-objects/applicant-id.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { ApplicantMapper } from '../../mappers/applicant.mapper';
import { UserFactoryMethod } from '../../../../common/domain/factories/user/factories/user.factory.method';
import { UserAbstractFactory } from '../../../../common/domain/factories/user/factories/abstract/user-abstract.factory';
import { UserType } from '../../../../common/domain/factories/user/enum/user-type';

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

    const userFactory: UserAbstractFactory = UserFactoryMethod.getType(
      UserType.APPLICANT,
    );

    const applicant: Applicant = userFactory.withId({
      applicantId: idResult,
      name: nameResult.value,
      email: emailResult.value,
      password: passwordResult.value,
      mySpecialty: command.mySpecialty,
      myExperience: command.myExperience,
      description: command.description,
      nameGithub: command.nameGithub,
      imgApplicant: command.imgApplicant,
    });

    const applicantTypeORM = ApplicantMapper.toTypeORM(applicant);
    await this.applicantRepository.update(command.targetId, applicantTypeORM);

    return applicantTypeORM;
  }
}
