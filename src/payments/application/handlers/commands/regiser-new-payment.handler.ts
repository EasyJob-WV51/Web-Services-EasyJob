import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';
import { RegisterNewPaymentCommand } from '../../../../companies/application/handlers/commands/register-new-payment.command';

@CommandHandler(RegisterNewPaymentCommand)
export class RegisterNewPaymentHandler
  implements ICommandHandler<RegisterNewPaymentCommand>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterNewPaymentCommand) {
    let payment: Payment= PaymentFactory.createFrom(
      command.amount,
      command.companyId,
      command.PaymentOption,
      command.suscription,
      command.date,
    );
    console.log("aqui")
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
