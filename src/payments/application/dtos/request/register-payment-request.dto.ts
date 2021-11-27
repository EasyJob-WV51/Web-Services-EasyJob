export class RegisterPaymentRequestDto {
  constructor(
    public readonly amount: number,
    public readonly companyId: number,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
