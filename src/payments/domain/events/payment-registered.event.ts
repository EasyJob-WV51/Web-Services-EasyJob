export class PaymentRegisteredEvent {
  constructor(
    public id: number,
    public amount: number,
    public companyId: number,
    public PaymentOption: string,
    public suscription: string,
    public date: string,
  ) {}
}
