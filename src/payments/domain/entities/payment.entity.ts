import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentId } from '../value-objects/payment-id.value';
import { PaymentRegisteredEvent } from '../events/payment-registered.event';

export class Payment extends AggregateRoot {
  private id: PaymentId;
  private amount: number;
  private companyId: number;
  private PaymentOption: string;
  private suscription: string;
  private date: string;

  public constructor(
    id: PaymentId,
    amount: number,
    companyId: number,
    PaymentOption: string,
    suscription: string,
    date: string,
  ) {
    super();
    this.id = id;
    this.amount = amount;
    this.companyId = companyId;
    this.PaymentOption = PaymentOption;
    this.suscription = suscription;
    this.date = date;
  }

  public register() {
    const event = new PaymentRegisteredEvent(
      this.id.getValue(),
      this.amount,
      this.companyId,
      this.PaymentOption,
      this.suscription,
      this.date,
    );
    this.apply(event);
  }

  public getId(): PaymentId {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCompanyId(): number {
    return this.companyId;
  }

  public getOption(): string {
    return this.PaymentOption;
  }

  public getSuscription(): string {
    return this.suscription;
  }

  public getDate(): string {
    return this.date;
  }

  public changeId(id: PaymentId) {
    this.id = id;
  }

  public changeCompanyName(companyId: number) {
    this.companyId = companyId;
  }

  public changeAmount(amount: number) {
    this.amount = amount;
  }

  public changeSuscription(suscription: string) {
    this.suscription = suscription;
  }
}
