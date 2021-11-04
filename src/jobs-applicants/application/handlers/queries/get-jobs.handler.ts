import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetJobsQuery } from '../../queries/get-jobs.query';
import { GetJobsDto } from '../../dto/queries/get-jobs.dto';

@QueryHandler(GetJobsQuery)
export class GetJobsHandler implements IQueryHandler<GetJobsQuery> {
  constructor() {}

  async execute(query: GetJobsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        companyId,
        title,
        description,
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

    const jobs: GetJobsDto[] = ormJobs.map(function (
      ormJob,
    ) {
      const jobDto = new GetJobsDto();
      jobDto.id = Number(ormJob.id);
      jobDto.companyId = Number(ormJob.companyId);
      jobDto.title = ormJob.title;
      jobDto.description = ormJob.description;
      jobDto.salary = ormJob.salary;
      jobDto.currency = ormJob.currency;
      jobDto.visible = ormJob.visible;
      jobDto.date = ormJob.date;

      return jobDto;
    });

    return jobs;
  }
}
