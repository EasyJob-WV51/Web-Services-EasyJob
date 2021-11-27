export class RegisterPaymentRequestDto {
  constructor(
    public readonly amount: number,
    public readonly company: string,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
