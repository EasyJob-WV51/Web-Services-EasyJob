import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { AnnouncementRegisteredEvent } from '../../../domain/events/announcement-registered.event';
import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../../../companies/infrastructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';

@EventsHandler(AnnouncementRegisteredEvent)
export class AnnouncementRegisteredHandler
  implements IEventHandler<AnnouncementRegisteredEvent>
{
  constructor(
  ) {}

  async handle(event: AnnouncementRegisteredEvent) {
    console.log(event);
  }
}
