import { Payment } from '../../domain/entities/payment.entity';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { PaymentIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.id.typeorm';

export class PaymentMapper {
  public static toTypeORM(payment: Payment): PaymentTypeORM {
    const paymentTypeORM: PaymentTypeORM = new PaymentTypeORM();

    paymentTypeORM.id = PaymentIdTypeORM.from(payment.getId().getValue());
    paymentTypeORM.amount = payment.getAmount();
    paymentTypeORM.companyId = payment.getCompanyId();
    paymentTypeORM.PaymentOption = payment.getOption();
    paymentTypeORM.suscription = payment.getSuscription();
    paymentTypeORM.date = payment.getDate();

    return paymentTypeORM;
  }
}
