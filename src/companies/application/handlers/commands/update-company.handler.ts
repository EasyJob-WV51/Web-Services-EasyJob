import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCompanyRequestDto } from '../../dtos/request/update-company-request.dto';
import { UpdateCompanyCommand } from '../../commands/update-company.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../infraestructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyFactory } from '../../../domain/factories/company.factory';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';
import { CompanyId } from '../../../domain/value-objects/company-id.value';
import { NameCompany } from '../../../domain/value-objects/namecompany.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { CompanyMapper } from '../../mappers/company.mapper';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler
  implements ICommandHandler<UpdateCompanyCommand>
{
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  async execute(command: UpdateCompanyCommand) {
    const idResult: CompanyId = CompanyId.create(command.id);

    const nameResult: Result<AppNotification, NameCompany> = NameCompany.create(
      command.nameCompany,
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

    const company: Company = CompanyFactory.withId(
      idResult,
      nameResult.value,
      emailResult.value,
      passwordResult.value,
      command.descriptionCompany,
      command.imgCompany,
    );

    const companyTypeORM = CompanyMapper.toTypeORM(company);
    await this.companyRepository.update(command.targetId, companyTypeORM);

    return companyTypeORM;
  }
}
