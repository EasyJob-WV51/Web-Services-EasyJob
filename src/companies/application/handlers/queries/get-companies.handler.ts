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
        password,
        
    FROM
        companies
    ORDER BY
        name_company;  
    `;

    const ormApplicants = await manager.query(sql);

    if (ormApplicants.length <= 0) {
      return [];
    }

    const companies: GetCompaniesDto[] = ormApplicants.map(function (
      ormApplicant,
    ) {
      const companyDto = new GetCompaniesDto();
      companyDto.id = Number(ormApplicant.id);
      companyDto.nameCompany = ormApplicant.nameCompany;
      companyDto.email = ormApplicant.email;
      companyDto.password = ormApplicant.password;
      companyDto.descriptionCompany = ormApplicant.descriptionCompany;
      companyDto.imgCompany = ormApplicant.imgCompany;
      return companyDto;
    });

    return companies;
  }
}
