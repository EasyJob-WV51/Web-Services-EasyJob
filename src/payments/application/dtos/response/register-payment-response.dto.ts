export class RegisterPaymentResponseDto {
  constructor(
    public id: number,
    public readonly amount: number,
    public readonly companyId: number,
    public readonly PaymentOption: string,
    public readonly suscription: string,
    public readonly date: string,
  ) {}
}
