export class PaymentRegisteredEvent {
  constructor(
    public id: number,
    public amount: number,
    public company: string,
    public PaymentOption: string,
    public suscription: string,
    public date: string,
  ) {}
}
