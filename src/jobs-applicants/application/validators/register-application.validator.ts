import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { getManager, Repository } from 'typeorm';
import { AnnouncementIdTypeORM } from '../../../announcement/infrastructure/persistence/typeorm/entities/announcement.id.typeorm';
import { RegisterApplicationRequestDto } from '../dto/request/register-application-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { DateCustom } from '../../domain/value-objects/date-custom';
import { JobTypeOrm } from '../../infrastructure/persistence/typeorm/entities/job.typeorm';
import { ApplicationsTypeOrm } from '../../infrastructure/persistence/typeorm/entities/applications.type.orm';

export class RegisterApplicationValidator {
  constructor(
    @InjectRepository(ApplicantTypeORM) private applicantRepository: Repository<ApplicantTypeORM>,
    @InjectRepository(JobTypeOrm) private announcementRepository: Repository<JobTypeOrm>
  ) {}

  public async validate(registerApplicationRequest: RegisterApplicationRequestDto): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    let manager = getManager();
    let sql = `
    SELECT
        *
    FROM 
        applications a
    WHERE
        a.applicantId = ${registerApplicationRequest.applicantId} &&
        a.announcementId = ${registerApplicationRequest.announcementId};
    `;

    let applicationTypeOrm: ApplicationsTypeOrm[] = await manager.query(sql);

    if (applicationTypeOrm != null) {
      notification.addError('Postulation registered', null);
      return notification;
    }

    const applicantTypeOrm: ApplicantTypeORM =
      await this.applicantRepository.findOne(registerApplicationRequest.applicantId);
    if (applicantTypeOrm == null){
      notification.addError('Applicant not found', null);
      return notification;
    }

    const announcementTypeOrm: JobTypeOrm =
      await this.announcementRepository.findOne(registerApplicationRequest.announcementId);
    if (announcementTypeOrm == null) {
      notification.addError('Announcement no found', null);
      return notification;
    }

    let date = DateCustom.create(registerApplicationRequest.date);
    if (date.isFailure()) {
      notification.addError("Date incorrect", null);
    }

    return notification;
  }
}
