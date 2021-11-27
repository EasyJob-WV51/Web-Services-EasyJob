import { Id } from '../../../../common/domain/value-objects/id.value';
import { DateCustom } from '../../../domain/value-objects/date-custom';

export class GetApplicationDto {
  public id: number;
  public applicantId: number;
  public announcementId: number;
  public state: string;
  public date: string;
}
