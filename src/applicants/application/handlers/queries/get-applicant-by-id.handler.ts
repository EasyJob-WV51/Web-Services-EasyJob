import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicantByIdQuery } from '../../queries/get-applicant-by-id.query';
import { getManager } from 'typeorm';
import { GetApplicantByIdDto } from '../../dtos/queries/get-applicant-by-id.dto';

@QueryHandler(GetApplicantByIdQuery)
export class GetApplicantByIdHandler
  implements IQueryHandler<GetApplicantByIdQuery>
{
  constructor() {}

  async execute(query: GetApplicantByIdQuery) {
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
        applicants
    WHERE id = ${query.id};
    `;

    const ormApplicant = await manager.query(sql);

    console.log(ormApplicant);

    if (ormApplicant.length <= 0) {
      return [];
    }

    const applicant = ormApplicant[0];
    const applicantDto = new GetApplicantByIdDto();

    applicantDto.id = Number(applicant.id);
    applicantDto.firstName = applicant.firstName;
    applicantDto.lastName = applicant.lastName;
    applicantDto.email = applicant.email;
    applicantDto.password = applicant.password;
    applicantDto.mySpecialty = applicant.mySpecialty;
    applicantDto.myExperience = applicant.myExperience;
    applicantDto.description = applicant.description;
    applicantDto.nameGithub = applicant.nameGithub;
    applicantDto.imgApplicant = applicant.imgApplicant;

    return applicantDto;
  }
}
