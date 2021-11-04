import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicantByIdQuery } from '../../queries/get-applicant-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';

@QueryHandler(GetApplicantByIdQuery)
export class GetApplicantByIdHandler
  implements IQueryHandler<GetApplicantByIdQuery>
{
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  async execute(query: GetApplicantByIdQuery) {
    const id = query.id;

    const applicant: ApplicantTypeORM = await this.applicantRepository.findOne(
      id,
    );

    return applicant;
  }
}
