export class PaymentRegisteredByCompanyEvent {
  constructor(
    public amount: number,
    public companyId: number,
    public PaymentOption: string,
    public suscription: string,
    public date: string,
  ) {}
}
