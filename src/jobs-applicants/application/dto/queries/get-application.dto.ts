import { Id } from '../../../../common/domain/value-objects/id.value';
import { DateCustom } from '../../../domain/value-objects/date-custom';
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
