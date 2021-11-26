import { Payment } from '../entities/payment.entity';
import { PaymentId } from '../value-objects/payment-id.value';

export class PaymentFactory {
  public static createFrom(
    amount: number,
    company: string,
    PaymentOption: string,
    suscription: string,
    date: string,
  ): Payment {
    return new Payment(
      PaymentId.create(0),
      amount,
      company,
      PaymentOption,
      suscription,
      date,
    );
  }

  public static withId(
    paymentId: PaymentId,
    amount: number,
    company: string,
    PaymentOption: string,
    suscription: string,
    date: string,
  ): Payment {
    return new Payment(
      paymentId,
      amount,
      company,
      PaymentOption,
      suscription,
      date,
    );
  }
}
