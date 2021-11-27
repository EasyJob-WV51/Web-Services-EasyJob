import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnnouncementByIdQuery } from '../../queries/get-announcement-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementTypeORM } from '../../../infrastructure/persistence/typeorm/entities/announcement.typeorm';

@QueryHandler(GetAnnouncementByIdQuery)
export class GetAnnouncementByIdHandler
  implements IQueryHandler<GetAnnouncementByIdQuery>
{
  constructor(
    @InjectRepository(AnnouncementTypeORM)
    private announcementRepository: Repository<AnnouncementTypeORM>,
  ) {}

  async execute(query: GetAnnouncementByIdQuery) {
    const id = query.id;

    const announcement: AnnouncementTypeORM =
      await this.announcementRepository.findOne(id);

    return announcement;
  }
}
