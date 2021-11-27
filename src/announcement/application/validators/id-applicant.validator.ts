import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdAnnouncementValidator {
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError(
        'The Announcement id must be a positive integer',
        null,
      );
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const announcement: AnnouncementTypeORM = await this.announcementRepository.findOne(id);

    if (announcement == null) {
      notification.addError(`There is no announcement with id: ${id}`, null);
    }

    return notification;
  }
}
