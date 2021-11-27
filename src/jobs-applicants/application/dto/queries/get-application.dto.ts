import { ApiProperty } from "@nestjs/swagger";

export class GetApplicationDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public applicantId: number;
  @ApiProperty()
  public announcementId: number;
  @ApiProperty()
  public state: string;
  @ApiProperty()
  public date: string;
}
