import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetJobDto } from '../../dto/queries/get-job.dto';
import { GetJobsBySpecialtyQuery } from '../../queries/get-jobs-by-specialty.query';
import { Console } from 'inspector';

@QueryHandler(GetJobsBySpecialtyQuery)
export class GetJobsBySpecialtyHandler implements IQueryHandler<GetJobsBySpecialtyQuery> {
  constructor() {}

  async execute(query: GetJobsBySpecialtyQuery) {
    const manager = getManager();
    query.specialty = "ninguna";
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
    WHERE 
        announcement.specialty = "${query.specialty}"
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
      jobDto.salary = Number(ormJob.salary);
      jobDto.currency = ormJob.currency;
      jobDto.visible = ormJob.visible;
      jobDto.date = ormJob.date;

      return jobDto;
    });

    return jobs;
  }
}
