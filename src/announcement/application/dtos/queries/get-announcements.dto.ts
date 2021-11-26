import { ApiProperty } from '@nestjs/swagger';

export class GetAnnouncementsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public requiredSpecialty: string;
  @ApiProperty()
  public requiredExperience: string;
  @ApiProperty()
  public salary: number;
  @ApiProperty()
  public typeMoney: string;
  @ApiProperty()
  public visible: boolean;
  @ApiProperty()
  public companyId: number;
}
