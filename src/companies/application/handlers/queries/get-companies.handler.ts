import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompaniesQuery } from '../../queries/get-companies.query';
import { getManager } from 'typeorm';
import { GetCompaniesDto } from '../../dtos/queries/get-companies.dto';

@QueryHandler(GetCompaniesQuery)
export class GetCompaniesHandler implements IQueryHandler<GetCompaniesQuery> {
  constructor() {}

  async execute(query: GetCompaniesQuery) {
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
    ORDER BY
        name_company;  
    `;

    const ormCompanies = await manager.query(sql);

    if (ormCompanies.length <= 0) {
      return [];
    }

    const companies: GetCompaniesDto[] = ormCompanies.map(function (
      ormCompany,
    ) {
      const companyDto = new GetCompaniesDto();
      companyDto.id = Number(ormCompany.id);
      companyDto.nameCompany = ormCompany.nameCompany;
      companyDto.email = ormCompany.email;
      companyDto.password = ormCompany.password;
      companyDto.descriptionCompany = ormCompany.descriptionCompany;
      companyDto.imgCompany = ormCompany.imgCompany;
      return companyDto;
    });

    return companies;
  }
}
