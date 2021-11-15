import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchApplicantQuery } from '../../queries/search-applicant.query';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { SearchApplicantDto } from '../../dtos/queries/search-applicant.dto';

@QueryHandler(SearchApplicantQuery)
export class SearchApplicantHandler
  implements IQueryHandler<SearchApplicantQuery>
{
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  async execute(query: SearchApplicantQuery) {
    const keyword = query.keyword;

    const ormApplicants = await this.applicantRepository
      .createQueryBuilder('applicant')
      .where('applicant.first_name like :first_name', {
        first_name: `%${keyword}%`,
      })
      .orWhere('applicant.last_name like :last_name', {
        last_name: `%${keyword}%`,
      })
      .orWhere('applicant.my_specialty like :my_specialty', {
        my_specialty: `%${keyword}%`,
      })
      .orWhere('applicant.name_github like :name_github', {
        name_github: `%${keyword}%`,
      })
      .getMany();

    if (ormApplicants.length <= 0) {
      return [];
    }

    const applicants: SearchApplicantDto[] = ormApplicants.map(function (
      ormApplicant,
    ) {
      const applicantDto = new SearchApplicantDto();
      applicantDto.id = Number(ormApplicant.id);
      applicantDto.firstName = ormApplicant.name.firstName;
      applicantDto.lastName = ormApplicant.name.lastName;
      applicantDto.email = ormApplicant.email.value;
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
