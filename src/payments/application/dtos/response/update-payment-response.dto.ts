export class UpdatePaymentResponseDto {
  constructor(
    public readonly id: number,
    public readonly amount: number,
    public readonly companyId: number,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
