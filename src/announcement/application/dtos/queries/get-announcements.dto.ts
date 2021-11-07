import { ApiProperty } from '@nestjs/swagger';

export class GetAnnouncementsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public requiredspecialty: string;
  @ApiProperty()
  public requiredexperience: string;
  @ApiProperty()
  public salary: number;
  @ApiProperty()
  public typemoney: string;
  @ApiProperty()
  public visible: boolean;
}
