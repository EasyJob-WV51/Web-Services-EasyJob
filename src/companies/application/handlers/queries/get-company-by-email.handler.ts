import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompanyByEmailQuery } from '../../queries/get-company-by-email.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { EmailTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyMapper } from '../../mappers/company.mapper';
import { getManager } from 'typeorm';
import { GetCompanyByIdDto } from '../../dtos/queries/get-company-by-id.dto';
import { GetCompaniesDto } from '../../dtos/queries/get-companies.dto';

@QueryHandler(GetCompanyByEmailQuery)
export class GetCompanyByEmailHandler
  implements IQueryHandler<GetCompanyByEmailQuery>
{
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  async execute(query: GetCompanyByEmailQuery) {

    /*const emails = query.email;

    const company:CompanyTypeORM = await this.companyRepository.findOne(
      {where:{email:emails}}
    );*/
    const manager = getManager();
    const sql = `
    SELECT 
        id,
        name_company as nameCompany,
        description_company as descriptionCompany,
        img_company as imgCompany,
        email,
        password
    FROM
        companies
    WHERE
        email=?;  
    `;
    const ormCompanies = await manager.query(sql, [query.email]);
    if (ormCompanies.length <= 0) {
      return {};
    }
    const ormCompany = ormCompanies[0];
    const companyDto = new GetCompaniesDto();
    companyDto.id=Number(ormCompany.id);
    companyDto.nameCompany=ormCompany.nameCompany;
    companyDto.email=ormCompany.email;
    companyDto.password=ormCompany.password;
    companyDto.descriptionCompany=ormCompany.descriptionCompany;
    companyDto.imgCompany=ormCompany.imgCompany;
    return companyDto;
  }
}