import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPaymentCommand } from '../../commands/register-payment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';

@CommandHandler(RegisterPaymentCommand)
export class RegisterPaymentHandler
  implements ICommandHandler<RegisterPaymentCommand>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterPaymentCommand) {
    let payment: Payment = PaymentFactory.createFrom(
      command.amount,
      command.companyId,
      command.PaymentOption,
      command.suscription,
      command.date,
    );

    let paymentTypeORM = PaymentMapper.toTypeORM(payment);
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);

    if (paymentTypeORM == null) {
      return 0;
    }

    const paymentId = Number(paymentTypeORM.id.value);
    payment.changeId(PaymentId.create(paymentId));

    payment = this.publisher.mergeObjectContext(payment);
    payment.register();
    payment.commit();

    return paymentId;
  }
}
