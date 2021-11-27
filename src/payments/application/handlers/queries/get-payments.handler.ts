import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentsQuery } from '../../queries/get-payments.query';
import { getManager } from 'typeorm';
import { GetPaymentsDto } from '../../dtos/queries/get-payments.dto';

@QueryHandler(GetPaymentsQuery)
export class GetPaymentsHandler implements IQueryHandler<GetPaymentsQuery> {
  constructor() {}

  async execute(query: GetPaymentsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        charge_amount as amount,
        company_id as companyId,
        Payment_Option as PaymentOption,
        suscriptions as suscription,
        payment_date as date
    FROM
        payments
    ORDER BY
        company;  
    `;

    const ormPayments = await manager.query(sql);

    if (ormPayments.length <= 0) {
      return [];
    }

    const payments: GetPaymentsDto[] = ormPayments.map(function (ormPayment) {
      const paymentDto = new GetPaymentsDto();
      paymentDto.id = Number(ormPayment.id);
      paymentDto.amount = ormPayment.amount;
      paymentDto.companyId = ormPayment.companyId;
      paymentDto.PaymentOption = ormPayment.PaymentOption;
      paymentDto.suscription = ormPayment.suscription;
      paymentDto.date = ormPayment.date;

      return paymentDto;
    });

    return payments;
  }
}
