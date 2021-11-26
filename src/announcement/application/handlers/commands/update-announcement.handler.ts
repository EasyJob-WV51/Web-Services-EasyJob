import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAnnouncementCommand } from '../../commands/update-announcement.command';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../../infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { Repository } from 'typeorm';
import { Announcement } from '../../../domain/entities/announcement.entity';
import { AnnouncementFactory } from '../../../domain/factories/announcement.factory';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';
import { AnnouncementId } from '../../../domain/value-objects/announcement-id.value';
import { CompanyId } from '../../../../companies/domain/value-objects/company-id.value';
import { AnnouncementMapper } from '../../mappers/announcement.mapper';
import { CompanyIdTypeORM } from '../../../../companies/infrastructure/persistence/typeorm/entities/company.id.typeorm';

@CommandHandler(UpdateAnnouncementCommand)
export class UpdateAnnouncementHandler
  implements ICommandHandler<UpdateAnnouncementCommand>
{
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  async execute(command: UpdateAnnouncementCommand) {
    const idResult: AnnouncementId = AnnouncementId.create(command.id);

    const companyResult= CompanyIdTypeORM.constructor(
      command.companyId,
    );

    const announcement: Announcement = AnnouncementFactory.withId(
      idResult,
      command.title,
      command.description,
      command.requiredSpecialty,
      command.requiredExperience,
      command.salary,
      command.typeMoney,
      command.visible,
      companyResult.value,
    );

    const announcementTypeORM = AnnouncementMapper.toTypeORM(announcement);
    await this.announcementRepository.update(
      command.targetId,
      announcementTypeORM,
    );

    return announcementTypeORM;
  }
}
