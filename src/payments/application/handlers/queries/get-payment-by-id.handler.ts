import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentByIdQuery } from '../../queries/get-payment-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdHandler
  implements IQueryHandler<GetPaymentByIdQuery>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  async execute(query: GetPaymentByIdQuery) {
    const id = query.id;

    const payment: PaymentTypeORM = await this.paymentRepository.findOne(
      id,
    );

    return payment;
  }
}
