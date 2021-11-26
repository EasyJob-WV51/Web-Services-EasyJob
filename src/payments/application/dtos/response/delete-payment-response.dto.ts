export class DeletePaymentResponseDto {
  constructor(
    public readonly id: number,
    public readonly amount: number,
    public readonly company: string,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
