import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCompanyCommand } from '../../commands/delete-company.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler
  implements ICommandHandler<DeleteCompanyCommand>
{
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  async execute(command: DeleteCompanyCommand) {
    const id = command.id;

    const company = await this.companyRepository.findOne(id);
    await this.companyRepository.delete(id);

    return company;
  }
}
