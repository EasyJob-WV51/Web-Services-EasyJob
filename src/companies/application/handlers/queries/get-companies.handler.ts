import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompaniesQuery } from '../../queries/get-companies.query';
import { getManager } from 'typeorm';
import { GetCompaniesDto } from '../../dtos/queries/get-companies.dto';
import { GetApplicantsDto } from '../../../../applicants/application/dtos/queries/get-applicants.dto';

@QueryHandler(GetCompaniesQuery)
export class GetCompaniesHandler implements IQueryHandler<GetCompaniesQuery> {
  constructor() {}

  async execute(query: GetCompaniesQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        last_name as lastName,
        first_name as firstName,
        my_specialty as mySpecialty,
        my_experience as myExperience,
        description,
        email,
        password,
        name_github as nameGithub,
        img_applicant as imgApplicant
    FROM
        companies
    ORDER BY
        last_name, first_name;  
    `;

    const ormApplicants = await manager.query(sql);

    if (ormApplicants.length <= 0) {
      return [];
    }

    const applicants: GetApplicantsDto[] = ormApplicants.map(function (
      ormApplicant,
    ) {
      const applicantDto = new GetApplicantsDto();
      applicantDto.id = Number(ormApplicant.id);
      applicantDto.firstName = ormApplicant.firstName;
      applicantDto.lastName = ormApplicant.lastName;
      applicantDto.email = ormApplicant.email;
      applicantDto.password = ormApplicant.password;
      applicantDto.mySpecialty = ormApplicant.mySpecialty;
      applicantDto.myExperience = ormApplicant.myExperience;
      applicantDto.description = ormApplicant.description;
      applicantDto.nameGithub = ormApplicant.nameGithub;
      applicantDto.imgApplicant = ormApplicant.imgApplicant;

      return applicantDto;
    });

    return applicants;
  }
}
