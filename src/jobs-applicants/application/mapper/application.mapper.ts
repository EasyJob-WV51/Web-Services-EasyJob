import { ApplicationsEntity } from '../../domain/entities/applications.entity';
import { ApplicationsTypeOrm } from '../../infrastructure/persistence/typeorm/entities/applications.type.orm';
import { DateCustomTypeOrm } from '../../infrastructure/persistence/typeorm/entities/date-custom-type.orm';
import { StateType } from '../../domain/enums/state-type.enum';

export class ApplicationMapper {
  public static toTypeOrm(application: ApplicationsEntity) {
    const applicationTypeOrm: ApplicationsTypeOrm = new ApplicationsTypeOrm();
    applicationTypeOrm.applicantId = application.showApplicantId();
    applicationTypeOrm.announcementId = application.showAnnouncementId();
    applicationTypeOrm.state = application.showState();
    applicationTypeOrm.date = DateCustomTypeOrm.from(application.showDatePostulation());
    return applicationTypeOrm;
  }
}
