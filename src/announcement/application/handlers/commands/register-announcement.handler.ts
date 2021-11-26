import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAnnouncementCommand } from '../../commands/register-announcement.command';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { AnnouncementFactory } from '../../../domain/factories/announcement.factory';
import { Announcement } from '../../../domain/entities/announcement.entity';
import { AnnouncementMapper } from '../../mappers/announcement.mapper';
import { CompanyIdTypeORM } from '../../../../companies/infrastructure/persistence/typeorm/entities/company.id.typeorm';

import { AnnouncementId } from '../../../domain/value-objects/announcement-id.value';

@CommandHandler(RegisterAnnouncementCommand)
export class RegisterAnnouncementHandler
  implements ICommandHandler<RegisterAnnouncementCommand>
{
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterAnnouncementCommand) {
    /*const companyResult= CompanyIdTypeORM.constructor(
      command.companyId,
    );*/

    let announcement: Announcement = AnnouncementFactory.createFrom(
      command.title,
      command.description,
      command.requiredSpecialty,
      command.requiredExperience,
      command.salary,
      command.typeMoney,
      command.visible,
      command.companyId,
    );

    let announcementTypeORM = AnnouncementMapper.toTypeORM(announcement);
    announcementTypeORM = await this.announcementRepository.save(
      announcementTypeORM,
    );

    if (announcementTypeORM == null) {
      return 0;
    }

    const announcementId = Number(announcementTypeORM.id.value);
    announcement.changeId(AnnouncementId.create(announcementId));

    announcement = this.publisher.mergeObjectContext(announcement);
    announcement.register();
    announcement.commit();

    return announcementId;
  }
}
