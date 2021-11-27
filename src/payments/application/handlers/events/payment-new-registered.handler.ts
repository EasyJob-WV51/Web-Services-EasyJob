import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { PaymentRegisteredEvent } from '../../../domain/events/payment-registered.event';
import { EventPublisher, IEventHandler } from '@nestjs/cqrs';
import { PaymentRegisteredByCompanyEvent } from '../../../../companies/domain/events/payment-registered-by-company.event';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';

@EventsHandler(PaymentRegisteredByCompanyEvent)
export class PaymentNewRegisteredHandler
  implements IEventHandler<PaymentRegisteredByCompanyEvent>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async handle(event: PaymentRegisteredByCompanyEvent) {
    let payment: Payment= PaymentFactory.createFrom(
      event.amount,
      event.companyId,
      event.PaymentOption,
      event.suscription,
      event.date,
    );
    let paymentTypeORM=PaymentMapper.toTypeORM(payment);
    paymentTypeORM=await this.paymentRepository.save(paymentTypeORM,);
    if(paymentTypeORM == null){
      return 0;
    }
    const paymentId=Number(paymentTypeORM.id.value);
    payment.changeId(PaymentId.create(paymentId));
    payment=this.publisher.mergeObjectContext(payment);
    payment.register();
    payment.commit();
    return paymentId;
  }
}
