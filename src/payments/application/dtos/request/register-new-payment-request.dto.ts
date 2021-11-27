export class RegisterNewPaymentRequestDto {
  constructor(
    public readonly amount: number,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
