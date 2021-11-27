import { ApiProperty } from '@nestjs/swagger';

export class GetPaymentsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public amount: number;
  @ApiProperty()
  public companyId: number;
  @ApiProperty()
  public PaymentOption: string;
  @ApiProperty()
  public suscription: string;
  @ApiProperty()
  public date: string;
}
