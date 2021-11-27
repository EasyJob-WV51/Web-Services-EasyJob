import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { UpdateAnnouncementDto } from '../dtos/request/update-applicant-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';

export class UpdateAnnouncementValidator {
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateAnnouncementRequestDto: UpdateAnnouncementDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateAnnouncementRequestDto.id;

    if (id == null) {
      notification.addError('Announcement id is required', null);
    }

    const title: string = updateAnnouncementRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Announcement title is required', null);
    }

    const description: string =
      updateAnnouncementRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Announcement description is required', null);
    }

    const requiredSpecialty: string =
      updateAnnouncementRequestDto.requiredSpecialty.trim();

    if (requiredSpecialty.length <= 0) {
      notification.addError('Announcement requiredSpecialty is required', null);
    }

    const requiredExperience: string =
      updateAnnouncementRequestDto.requiredExperience.trim();

    if (requiredExperience.length <= 0) {
      notification.addError(
        'Announcement requiredExperience is required',
        null,
      );
    }

    const salary: number =
      updateAnnouncementRequestDto.salary;

    if (salary == 0) {
      notification.addError('Announcement salary is required', null);
    }

    const typeMoney: string =
      updateAnnouncementRequestDto.typeMoney.toString();

    if (typeMoney.length <= 0) {
      notification.addError('Announcement typeMoney is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  }
}
