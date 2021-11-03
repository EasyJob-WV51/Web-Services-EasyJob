import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { ApplicantRegisteredEvent } from '../../../domain/events/applicant-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ApplicantRegisteredEvent)
export class ApplicantRegisteredHandler
  implements IEventHandler<ApplicantRegisteredEvent>
{
  constructor() {}

  handle(event: ApplicantRegisteredEvent) {
    console.log(event);
  }
}
