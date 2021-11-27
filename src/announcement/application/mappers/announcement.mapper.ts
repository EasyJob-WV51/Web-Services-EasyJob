import { Announcement } from '../../domain/entities/announcement.entity';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { AnnouncementIdTypeORM} from '../../infrastructure/persistence/typeorm/entities/announcement.id.typeorm';
import { CompanyIdTypeORM } from '../../../companies/infrastructure/persistence/typeorm/entities/company.id.typeorm';


export class AnnouncementMapper {
  public static toTypeORM(announcement: Announcement): AnnouncementTypeORM {
    const announcementTypeORM: AnnouncementTypeORM = new AnnouncementTypeORM();

    announcementTypeORM.id = AnnouncementIdTypeORM.from(
      announcement.getId().getValue(),
    );

    announcementTypeORM.title = announcement.getTitle();
    announcementTypeORM.description=announcement.getDescription();
    announcementTypeORM.requiredSpecialty=announcement.getSpecialty();
    announcementTypeORM.requiredExperience=announcement.getExperience();
    announcementTypeORM.salary=announcement.getSalary();
    announcementTypeORM.typeMoney=announcement.getTypeMoney();
    announcementTypeORM.visible=announcement.getVisible();
    announcementTypeORM.companyId = announcement.getCompanyId();

    return announcementTypeORM;
  }
}
