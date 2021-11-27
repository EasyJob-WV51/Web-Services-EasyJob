import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { RegisterAnnouncementDto } from '../dtos/request/register-announcement-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterNewAnnouncementRequestDto } from '../dtos/request/register-new-announcement-request.dto';
import { CompanyTypeORM } from '../../../companies/infrastructure/persistence/typeorm/entities/company.typeorm';

export class RegisterNewAnnouncementValidator {
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  public async validate(
    registerAnnouncementRequestDto: RegisterNewAnnouncementRequestDto,ida:number,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const title: string =
      registerAnnouncementRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Announcement title is required', null);
    }

    const description: string =
      registerAnnouncementRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Announcement description is required', null);
    }

    const requiredSpecialty: string =
      registerAnnouncementRequestDto.requiredSpecialty.trim();

    if (requiredSpecialty.length <= 0) {
      notification.addError('Announcement requiredSpecialty is required', null);
    }

    const requiredExperience: string =
      registerAnnouncementRequestDto.requiredExperience.trim();

    if (requiredExperience.length <= 0) {
      notification.addError(
        'Announcement requiredExperience is required',
        null,
      );
    }

    const salary: number =
      registerAnnouncementRequestDto.salary;

    if (salary == 0) {
      notification.addError('Announcement salary is required', null);
    }

    const typeMoney: string =
      registerAnnouncementRequestDto.typeMoney.toString();

    if (typeMoney.length <= 0) {
      notification.addError('Announcement typeMoney is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const companyId: number =
      ida;
    const company: CompanyTypeORM = await this.companyRepository
      .createQueryBuilder()
      .where('id = :companyId', { companyId })
      .getOne();

    if (company == null) {
      notification.addError('Announcement companyId is bad', null);
    }

    return notification;
  }
}
