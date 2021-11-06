import { ApiProperty } from '@nestjs/swagger';

export class GetCompaniesDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public nameCompany: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public descriptionCompany: string;
  @ApiProperty()
  public imgCompany: string;
}
