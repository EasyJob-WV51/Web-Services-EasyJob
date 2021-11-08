import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCompanyCommand } from '../../commands/register-company.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { NameCompany } from '../../../domain/value-objects/namecompany.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { CompanyFactory } from '../../../domain/factories/company.factory';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyMapper } from '../../mappers/company.mapper';
import { CompanyId } from '../../../domain/value-objects/company-id.value';

@CommandHandler(RegisterCompanyCommand)
export class RegisterCompanyHandler
  implements ICommandHandler<RegisterCompanyCommand>
{
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterCompanyCommand) {
    const nameResult: Result<AppNotification, NameCompany> = NameCompany.create(
      command.nameCompany,
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

    let company: Company = CompanyFactory.createFrom(
      nameResult.value,
      emailResult.value,
      passwordResult.value,
      command.descriptionCompany,
      command.imgCompany,
    );

    let companyTypeORM = CompanyMapper.toTypeORM(company);
    companyTypeORM = await this.companyRepository.save(companyTypeORM);

    if (companyTypeORM == null) {
      return 0;
    }

    const companyId = Number(companyTypeORM.id.value);
    company.changeId(CompanyId.create(companyId));

    company = this.publisher.mergeObjectContext(company);
    company.register();
    company.commit();

    return companyId;
  }
}
