import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAnnouncementCommand } from '../../commands/delete-announcement.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementTypeORM } from '../../../infrastructure/persistence/typeorm/entities/announcement.typeorm';

@CommandHandler(DeleteAnnouncementCommand)
export class DeleteAnnouncementHandler
  implements ICommandHandler<DeleteAnnouncementCommand>
{
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  async execute(command: DeleteAnnouncementCommand) {
    const id = command.id;

    const announcement = await this.announcementRepository.findOne(id);
    await this.announcementRepository.delete(id);

    return announcement;
  }
}
