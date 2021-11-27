import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePaymentRequestDto } from '../../dtos/request/update-payment-request.dto';
import { UpdatePaymentCommand } from '../../commands/update-payment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';
import { PaymentMapper } from '../../mappers/payment.mapper';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler
  implements ICommandHandler<UpdatePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const idResult: PaymentId = PaymentId.create(command.id);

    const payment: Payment = PaymentFactory.withId(
      idResult,
      command.amount,
      command.companyId,
      command.PaymentOption,
      command.suscription,
      command.date,
    );

    const paymentTypeORM = PaymentMapper.toTypeORM(payment);
    await this.paymentRepository.update(command.targetId, paymentTypeORM);

    return paymentTypeORM;
  }
}
