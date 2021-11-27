import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetApplicantsQuery } from '../../../../applicants/application/queries/get-applicants.query';
import { GetApplicationDto } from '../../dto/queries/get-application.dto';
import { GetApplicationsQuery } from '../../queries/get-applications.query';

@QueryHandler(GetApplicationsQuery)
export class GetApplicationsHandler implements IQueryHandler<GetApplicationsQuery> {
  constructor() {}

  async execute(query: GetApplicantsQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.applicantId,
      a.announcementId,
      a.state,
      date_format(a.date, '%Y-%m-%d') AS date
    FROM 
      applications a
    ORDER BY
      a.date DESC;`;
    const ormApplication = await manager.query(sql);
    if (ormApplication.length <= 0) {
      return [];
    }
    const applications: GetApplicationDto[] = ormApplication.map(function (ormApplication) {
      let applicationDto = new GetApplicationDto();
      applicationDto.id = Number(ormApplication.id);
      applicationDto.applicantId = Number(ormApplication.applicantId);
      applicationDto.announcementId = Number(ormApplication.announcementId);
      applicationDto.state = ormApplication.state;
      applicationDto.date = ormApplication.date;
      return applicationDto;
    });
    return applications;
  }
}
