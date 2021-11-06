import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { CompanyRegisteredEvent } from '../../../domain/events/company-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CompanyRegisteredEvent)
export class CompanyRegisteredHandler
  implements IEventHandler<CompanyRegisteredEvent>
{
  constructor() {}

  handle(event: CompanyRegisteredEvent) {
    console.log(event);
  }
}
