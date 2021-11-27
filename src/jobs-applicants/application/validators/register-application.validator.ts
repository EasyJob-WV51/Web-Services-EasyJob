import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { getManager, Repository } from 'typeorm';
import { RegisterApplicationRequestDto } from '../dto/request/register-application-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { DateCustom } from '../../domain/value-objects/date-custom';
import { ApplicationsTypeOrm } from '../../infrastructure/persistence/typeorm/entities/applications.type.orm';
import { AnnouncementTypeORM } from "../../../announcement/infrastructure/persistence/typeorm/entities/announcement.typeorm";

export class RegisterApplicationValidator {
  constructor(
    @InjectRepository(ApplicantTypeORM) private applicantRepository: Repository<ApplicantTypeORM>,
    @InjectRepository(AnnouncementTypeORM) private announcementRepository: Repository<AnnouncementTypeORM>
  ) {}

  public async validate(registerApplicationRequest: RegisterApplicationRequestDto): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const applicantTypeOrm: ApplicantTypeORM =
      await this.applicantRepository.findOne(registerApplicationRequest.applicantId);
    if (applicantTypeOrm == null){
      notification.addError('Applicant not found', null);
      return notification;
    }

    const announcementTypeOrm: AnnouncementTypeORM =
      await this.announcementRepository.findOne(registerApplicationRequest.announcementId);
    if (announcementTypeOrm == null) {
      notification.addError('Announcement no found', null);
      return notification;
    }

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

    if (applicationTypeOrm.length > 0) {
      notification.addError('Application has already been registered', null);
      return notification;
    }

    let date = DateCustom.create(registerApplicationRequest.date);
    if (date.isFailure()) {
      notification.addError("Date incorrect", null);
    }

    return notification;
  }
}
