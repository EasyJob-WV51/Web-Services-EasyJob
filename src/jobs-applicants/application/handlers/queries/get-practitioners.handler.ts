import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetJobDto } from '../../dto/queries/get-job.dto';
import { GetPractitionersQuery } from '../../queries/get-practitioners.query';

@QueryHandler(GetPractitionersQuery)
export class GetPractitionersHandler implements IQueryHandler<GetPractitionersQuery> {
  constructor() {}

  async execute(query: GetPractitionersQuery) {
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
    WHERE
        announcement.onlyPractitioner = 1
    ORDER BY
        date DESC;
    `;

    const ormPractitioners = await manager.query(sql);

    if (ormPractitioners.length <= 0) {
      return [];
    }

    const practitioners: GetJobDto[] = ormPractitioners.map(function (
      ormPractitioner,
    ) {
      const jobDto = new GetJobDto();
      jobDto.id = Number(ormPractitioner.id);
      jobDto.title = ormPractitioner.title;
      jobDto.description = ormPractitioner.description;
      jobDto.salary = ormPractitioner.salary;
      jobDto.currency = ormPractitioner.currency;
      jobDto.visible = ormPractitioner.visible;
      jobDto.date = ormPractitioner.date;

      return jobDto;
    });

    return practitioners;
  }
}
