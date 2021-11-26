import { Announcement } from '../entities/announcement.entity';
import { CompanyId } from '../../../companies/domain/value-objects/company-id.value';
import { AnnouncementId} from '../value-objects/announcement-id.value';
import { Company } from '../../../companies/domain/entities/company.entity';

export class AnnouncementFactory{
  public static createFrom(
    title:string,
    description:string,
    requiredSpecialty:string,
    requiredExperience:string,
    salary: number,
    typeMoney: string,
    visible:boolean,
    companyId: number,
  ): Announcement{
    return new Announcement(
      AnnouncementId.create(0),
      title,
      description,
      requiredSpecialty,
      requiredExperience,
      salary,
      typeMoney,
      visible,
      companyId,
    );
  }
  public static withId(
    AnnouncementId: AnnouncementId,
    title: string,
    description: string,
    requiredSpecialty:string,
    requiredExperience:string,
    salary:number,
    typeMoney:string,
    visible:boolean,
    companyId:number
  ): Announcement{
    return new Announcement(
      AnnouncementId,
      title,
      description,
      requiredSpecialty,
      requiredExperience,
      salary,
      typeMoney,
      visible,
      companyId,
    );
  }

}