import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager, Repository } from 'typeorm';
import { GetJobByIdQuery } from '../../queries/get-job-by-id.query';
import { ApplicantTypeORM } from '../../../../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/job.typeorm';

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
  constructor(
    @InjectRepository(JobTypeOrm)
    private jobRepository: Repository<JobTypeOrm>)
  {}

  async execute(query: GetJobByIdQuery) {
    const id = query.id;

    const job: JobTypeOrm = await this.jobRepository.findOne(
      id,
    );

    return job;
  }
}
