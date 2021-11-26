import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePaymentCommand } from '../../commands/delete-payment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeletePaymentCommand)
export class DeletePaymentHandler
  implements ICommandHandler<DeletePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  async execute(command: DeletePaymentCommand) {
    const id = command.id;

    const payment = await this.paymentRepository.findOne(id);
    await this.paymentRepository.delete(id);

    return payment;
  }
}
