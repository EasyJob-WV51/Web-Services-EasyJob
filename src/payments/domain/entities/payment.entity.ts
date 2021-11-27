import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentId } from '../value-objects/payment-id.value';
import { PaymentRegisteredEvent } from '../events/payment-registered.event';

export class Payment extends AggregateRoot {
  private id: PaymentId;
  private amount: number;
  private company: string;
  private PaymentOption: string;
  private suscription: string;
  private date: string;

  public constructor(
    id: PaymentId,
    amount: number,
    company: string,
    PaymentOption: string,
    suscription: string,
    date: string,
  ) {
    super();
    this.id = id;
    this.amount = amount;
    this.company = company;
    this.PaymentOption = PaymentOption;
    this.suscription = suscription;
    this.date = date;
  }

  public register() {
    const event = new PaymentRegisteredEvent(
      this.id.getValue(),
      this.amount,
      this.company,
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

  public getCompany(): string {
    return this.company;
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

  public changeCompanyName(company: string) {
    this.company = company;
  }

  public changeAmount(amount: number) {
    this.amount = amount;
  }

  public changeSuscription(suscription: string) {
    this.suscription = suscription;
  }
}
