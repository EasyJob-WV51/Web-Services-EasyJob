import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetJobsQuery } from '../../queries/get-jobs.query';
import { GetJobDto } from '../../dto/queries/get-job.dto';

@QueryHandler(GetJobsQuery)
export class GetJobsHandler implements IQueryHandler<GetJobsQuery> {
  constructor() {}

  async execute(query: GetJobsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        title,
        description,
        specialty,
        experience,
        salary,
        currency,
        visible,
        date_format(date, '%d %m %Y') AS date
    FROM
        announcement
    ORDER BY
        date DESC;  
    `;

    const ormJobs = await manager.query(sql);

    if (ormJobs.length <= 0) {
      return [];
    }

    const jobs: GetJobDto[] = ormJobs.map(function (
      ormJob,
    ) {
      const jobDto = new GetJobDto();
      jobDto.id = Number(ormJob.id);
      jobDto.title = ormJob.title;
      jobDto.description = ormJob.description;
      jobDto.specialty = ormJob.specialty;
      jobDto.experience = ormJob.experience;
      jobDto.salary = ormJob.salary;
      jobDto.currency = ormJob.currency;
      jobDto.visible = ormJob.visible;
      jobDto.date = ormJob.date;

      return jobDto;
    });

    return jobs;
  }
}
