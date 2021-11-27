import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager, Repository } from 'typeorm';
import { GetJobByIdQuery } from '../../queries/get-job-by-id.query';
import { ApplicantTypeORM } from '../../../../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/job.typeorm';
import { GetJobDto } from '../../dto/queries/get-job.dto';
import { GetJobResponseDto } from '../../dto/response/get-job.response.dto';

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
  constructor(
    @InjectRepository(JobTypeOrm)
    private jobRepository: Repository<JobTypeOrm>)
  {}

  async execute(query: GetJobByIdQuery) {
    const jobId = query.id;
    const job: JobTypeOrm = await this.jobRepository.findOne(jobId);
    return job;
  }
}
