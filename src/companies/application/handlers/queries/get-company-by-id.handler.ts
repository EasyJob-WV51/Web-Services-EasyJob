import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompanyByIdQuery } from '../../queries/get-company-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/company.typeorm';

@QueryHandler(GetCompanyByIdQuery)
export class GetCompanyByIdHandler
  implements IQueryHandler<GetCompanyByIdQuery>
{
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  async execute(query: GetCompanyByIdQuery) {
    const id = query.id;

    const company: CompanyTypeORM = await this.companyRepository.findOne(
      id,
    );

    return company;
  }
}
