import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { PaymentRegisteredEvent } from '../../../domain/events/payment-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PaymentRegisteredEvent)
export class PaymentRegisteredHandler
  implements IEventHandler<PaymentRegisteredEvent>
{
  constructor() {}

  handle(event: PaymentRegisteredEvent) {
    console.log(event);
  }
}
